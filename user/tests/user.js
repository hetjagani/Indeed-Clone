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
const { User } = require('../model');
const kafkaClient = require('../util/kafka/client');

chai.should();
chai.use(chaiHttp);

describe('User Testcases', () => {
  let stb;
  before(() => {
    initDB();
  });

  after(async () => {
    await User.deleteMany({});
  });

  beforeEach(() => {
    nock(`${global.gConfig.auth_url}`)
      .get('/auth/validate')
      .query({ token: 'secrettoken' })
      .reply(200, { valid: true, role: 'user', user: '616eee906f354a1864dc650d' });

    stb = sinon
      .stub(kafkaClient, 'makeRequest')
      .callsFake(async (queue_name, msg_payload, callback) => {
        if (queue_name === 'user.create') {
          try {
            const user = await User.create(msg_payload);
            callback(null, user);
          } catch (err) {
            callback({ isError: true, error: err.toString() });
          }
        }
        if (queue_name === 'user.update') {
          const custId = msg_payload._id;

          try {
            const user = await User.findOneAndUpdate(
              {
                _id: Types.ObjectId(String(custId)),
              },
              {
                $set: msg_payload,
              },
              {
                new: true,
              },
            );
            callback(null, user);
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

  let createdUser = '';
  it('it should create a user', (done) => {
    const data = {
      id: '616eee906f354a1864dc650d',
      name: 'Test User',
      about: 'About User',
      contactNo: '89028903',
      emails: ['testuser@mail.com'],
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      zip: '95126',
    };

    chai
      .request(app)
      .post('/users')
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(201);
          res.body.should.have.property('_id').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('name').eql('Test User');
          res.body.should.have.property('about').eql('About User');
          res.body.should.have.property('contactNo').eql('89028903');
          res.body.should.have.property('city').eql('San Jose');
          res.body.should.have.property('state').eql('CA');
          res.body.should.have.property('country').eql('USA');
          res.body.should.have.property('zip').eql('95126');
          createdUser = res.body._id;
        }
        done();
      });
  });

  it('it should fetch the created user', (done) => {
    chai
      .request(app)
      .get(`/users/${createdUser}`)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('name').eql('Test User');
          res.body.should.have.property('about').eql('About User');
          res.body.should.have.property('contactNo').eql('89028903');
          res.body.should.have.property('city').eql('San Jose');
          res.body.should.have.property('state').eql('CA');
          res.body.should.have.property('country').eql('USA');
          res.body.should.have.property('zip').eql('95126');
        }
        done();
      });
  });

  it('it should update the user', (done) => {
    const data = {
      name: 'Updated Test User',
      about: 'About Updated User',
      contactNo: '89028903',
      emails: ['testuser@mail.com'],
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      zip: '95126',
    };

    chai
      .request(app)
      .put(`/users/${createdUser}`)
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('_id').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('name').eql('Updated Test User');
          res.body.should.have.property('about').eql('About Updated User');
          res.body.should.have.property('contactNo').eql('89028903');
          res.body.should.have.property('city').eql('San Jose');
          res.body.should.have.property('state').eql('CA');
          res.body.should.have.property('country').eql('USA');
          res.body.should.have.property('zip').eql('95126');
        }
        done();
      });
  });
});
