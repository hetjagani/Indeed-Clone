/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable global-require */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { Types } = require('mongoose');
const nock = require('nock');
require('../config');
const sinon = require('sinon');
const { initDB } = require('../db');
const { Company, Employer } = require('../model');
const kafkaClient = require('../util/kafka/client');

chai.should();
chai.use(chaiHttp);

describe('Employer Testcases', () => {
  let stb;
  before(() => {
    initDB();
  });

  after(async () => {
    await Employer.deleteMany({});
    await Company.deleteMany({});
  });

  beforeEach(() => {
    nock(`${global.gConfig.auth_url}`)
      .get('/auth/validate')
      .query({ token: 'secrettoken' })
      .reply(200, { valid: true, role: 'employer', user: '616eee906f354a1864dc650d' });

    stb = sinon
      .stub(kafkaClient, 'makeRequest')
      .callsFake(async (queue_name, msg_payload, callback) => {
        if (queue_name === 'employer.create') {
          try {
            const employer = await Employer.create(msg_payload);

            if (msg_payload.companyId && msg_payload.companyId !== '') {
              await Company.updateOne(
                { _id: Types.ObjectId(msg_payload.companyId) },
                { $push: { employers: employer._id } },
              );
            }
            callback(null, employer);
          } catch (err) {
            callback({ isError: true, error: err.toString() });
          }
        }
        if (queue_name === 'employer.update') {
          try {
            delete msg_payload.data.companyId;
            await Employer.updateOne({ _id: msg_payload.id }, msg_payload.data);
            callback(null, { _id: msg_payload.id });
          } catch (err) {
            callback({ isError: true, error: err.toString() });
          }
        }
      });
    app = require('../app');
  });

  afterEach(() => {
    stb.restore();
  });

  let createdEmployer = '';
  it('it should create a employer', (done) => {
    const data = {
      id: '616eee906f354a1864dc650d',
      name: 'Employer 1',
      role: 'Recruiter',
      address: 'Employer Address',
      dateOfBirth: '10/10/1991',
    };

    chai
      .request(app)
      .post('/employers')
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(201);
          res.body.should.have.property('_id').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('name').eql('Employer 1');
          res.body.should.have.property('role').eql('Recruiter');
          res.body.should.have.property('address').eql('Employer Address');
          res.body.should.have.property('dateOfBirth').eql('10/10/1991');
          createdEmployer = res.body._id;
        }
        done();
      });
  });

  it('it should fetch the created employer', (done) => {
    chai
      .request(app)
      .get(`/employers/${createdEmployer}`)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('name').eql('Employer 1');
          res.body.should.have.property('role').eql('Recruiter');
          res.body.should.have.property('address').eql('Employer Address');
          res.body.should.have.property('dateOfBirth').eql('10/10/1991');
        }
        done();
      });
  });

  it('it should update the company', (done) => {
    const data = {
      name: 'Updated Employer 1',
      role: 'Recruiter Updated',
      address: 'Employer Address Updated',
      dateOfBirth: '10/10/1991',
    };

    chai
      .request(app)
      .put(`/employers/${createdEmployer}`)
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('name').eql('Updated Employer 1');
          res.body.should.have.property('role').eql('Recruiter Updated');
          res.body.should.have.property('address').eql('Employer Address Updated');
          res.body.should.have.property('dateOfBirth').eql('10/10/1991');
        }
        done();
      });
  });
});
