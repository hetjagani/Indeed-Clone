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

describe('Company Testcases', () => {
  let stb;
  before(async () => {
    initDB();

    await Employer.create({
      _id: Types.ObjectId('616eee906f354a1864dc650d'),
      name: 'Employer 1',
      role: 'General Employer',
      address: 'Employer Address',
    });
  });

  after(async () => {
    stb = null;
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
        if (queue_name === 'company.create') {
          try {
            const company = await Company.create(msg_payload.company);

            await Employer.updateOne(
              { _id: Types.ObjectId(msg_payload.user) },
              { companyId: company._id },
            );

            callback(null, company);
          } catch (err) {
            callback({ isError: true, error: err.toString() });
          }
        }
        if (queue_name === 'company.update') {
          try {
            await Company.updateOne({ _id: Types.ObjectId(msg_payload.id) }, msg_payload.data);

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

  let createdCompany = '';

  it('it should create a company', (done) => {
    const data = {
      name: 'Good Company',
      description: {},
      about: 'A Good Company',
      workCulture: 'Friendly',
      values: 'none',
      mission: 'mission peak',
      foundedOn: '10/10/2000',
      ceo: 'Good Person',
      industry: { name: 'Good Indus' },
      headquarters: 'San Jose',
      revenue: '200392',
      size: 10,
      website: 'https://goodcompany.org',
      logo: { url: 'https://goodcompany.org/ico.png' },
    };

    chai
      .request(app)
      .post('/companies')
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(201);
          res.body.should.have.property('name').eql('Good Company');
          res.body.should.have.property('about').eql('A Good Company');
          res.body.should.have.property('workCulture').eql('Friendly');
          res.body.should.have.property('values').eql('none');
          res.body.should.have.property('mission').eql('mission peak');
          res.body.should.have.property('foundedOn').eql('2000-10-10T07:00:00.000Z');
          res.body.should.have.property('ceo').eql('Good Person');
          res.body.should.have.property('industry').property('name', 'Good Indus');
          res.body.should.have.property('headquarters').eql('San Jose');
          res.body.should.have.property('revenue').eql('200392');
          res.body.should.have.property('size').eql(10);
          res.body.should.have.property('website').eql('https://goodcompany.org');
          res.body.should.have.property('logo').property('url', 'https://goodcompany.org/ico.png');
          createdCompany = res.body._id;
        }
        done();
      });
  });

  it('it should fetch the created company', (done) => {
    chai
      .request(app)
      .get(`/companies/${createdCompany}`)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('name').eql('Good Company');
          res.body.should.have.property('about').eql('A Good Company');
          res.body.should.have.property('workCulture').eql('Friendly');
          res.body.should.have.property('values').eql('none');
          res.body.should.have.property('mission').eql('mission peak');
          res.body.should.have.property('foundedOn').eql('2000-10-10T07:00:00.000Z');
          res.body.should.have.property('ceo').eql('Good Person');
          res.body.should.have.property('industry').property('name', 'Good Indus');
          res.body.should.have.property('headquarters').eql('San Jose');
          res.body.should.have.property('revenue').eql('200392');
          res.body.should.have.property('size').eql(10);
          res.body.should.have.property('website').eql('https://goodcompany.org');
          res.body.should.have.property('logo').property('url', 'https://goodcompany.org/ico.png');
        }
        done();
      });
  });

  it('it should update the company', (done) => {
    const data = {
      name: 'Updated Good Company',
      description: {},
      about: 'A Updated Good Company',
      workCulture: 'Updated Friendly',
      values: 'none',
      mission: 'mission peak updated',
      foundedOn: '10/10/2000',
      ceo: 'Good Person',
      industry: { name: 'Good Industry' },
      headquarters: 'San Francisco',
      revenue: '200392',
      size: 10,
      website: 'https://goodcompany.org',
      logo: { url: 'https://goodcompany.org/ico.png' },
    };

    chai
      .request(app)
      .put(`/companies/${createdCompany}`)
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('name').eql('Updated Good Company');
          res.body.should.have.property('about').eql('A Updated Good Company');
          res.body.should.have.property('workCulture').eql('Updated Friendly');
          res.body.should.have.property('values').eql('none');
          res.body.should.have.property('mission').eql('mission peak updated');
          res.body.should.have.property('foundedOn').eql('2000-10-10T07:00:00.000Z');
          res.body.should.have.property('ceo').eql('Good Person');
          res.body.should.have.property('industry').property('name', 'Good Industry');
          res.body.should.have.property('headquarters').eql('San Francisco');
          res.body.should.have.property('revenue').eql('200392');
          res.body.should.have.property('size').eql(10);
          res.body.should.have.property('website').eql('https://goodcompany.org');
          res.body.should.have.property('logo').property('url', 'https://goodcompany.org/ico.png');
        }
        done();
      });
  });
});
