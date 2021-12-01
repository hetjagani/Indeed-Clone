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
const { Review } = require('../model');
const kafkaClient = require('../util/kafka/client');

chai.should();
chai.use(chaiHttp);

describe('Review Testcases', () => {
  let stb;
  before(() => {
    initDB();
  });

  after(async () => {
    await Review.deleteMany({});
  });

  beforeEach(() => {
    nock(`${global.gConfig.auth_url}`)
      .get('/auth/validate')
      .query({ token: 'secrettoken' })
      .reply(200, { valid: true, role: 'employer', user: '616eee906f354a1864dc650d' });

    stb = sinon
      .stub(kafkaClient, 'makeRequest')
      .callsFake(async (queue_name, msg_payload, callback) => {
        if (queue_name === 'review.create') {
          try {
            const review = await Review.create(msg_payload);
            callback(null, review);
          } catch (err) {
            callback({ isError: true, error: err.toString() });
          }
        }
        if (queue_name === 'review.update') {
          try {
            await Review.updateOne({ _id: Types.ObjectId(msg_payload.id) }, msg_payload.data);
            const newReview = await Review.findOne({ _id: Types.ObjectId(msg_payload.id) });
            callback(null, newReview);
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

  let createdReview = '';
  it('it should create a review', (done) => {
    const data = {
      overallRating: 2,
      workLifeBalance: 3,
      compensation: 4,
      jobSecurity: 3,
      management: 4,
      jobCulture: 3,
      summary: 'A Review',
      review: 'A good review',
      pros: 'none',
      cons: 'many',
      ceoApproval: true,
      tips: 'none',
      companyId: '619ad00a17b516a4cbaa9941',
      userId: '616eee906f354a1864dc650d',
      isFeatured: true,
      status: 'PENDING',
      reviewDate: '10/10/2020',
      helpful: 2,
    };

    chai
      .request(app)
      .post('/reviews')
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(201);
          res.body.should.have.property('overallRating').eql(2);
          res.body.should.have.property('workLifeBalance').eql(3);
          res.body.should.have.property('compensation').eql(4);
          res.body.should.have.property('jobSecurity').eql(3);
          res.body.should.have.property('management').eql(4);
          res.body.should.have.property('jobCulture').eql(3);
          res.body.should.have.property('summary').eql('A Review');
          res.body.should.have.property('review').eql('A good review');
          res.body.should.have.property('pros').eql('none');
          res.body.should.have.property('cons').eql('many');
          res.body.should.have.property('ceoApproval').eql(true);
          res.body.should.have.property('tips').eql('none');
          res.body.should.have.property('companyId').eql('619ad00a17b516a4cbaa9941');
          res.body.should.have.property('userId').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('isFeatured').eql(true);
          res.body.should.have.property('status').eql('PENDING');
          res.body.should.have.property('reviewDate').eql('2020-10-10T07:00:00.000Z');
          res.body.should.have.property('helpful').eql(2);
          createdReview = res.body._id;
        }
        done();
      });
  });

  it('it should fetch the created review', (done) => {
    chai
      .request(app)
      .get(`/reviews/${createdReview}`)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('overallRating').eql(2);
          res.body.should.have.property('workLifeBalance').eql(3);
          res.body.should.have.property('compensation').eql(4);
          res.body.should.have.property('jobSecurity').eql(3);
          res.body.should.have.property('management').eql(4);
          res.body.should.have.property('jobCulture').eql(3);
          res.body.should.have.property('summary').eql('A Review');
          res.body.should.have.property('review').eql('A good review');
          res.body.should.have.property('pros').eql('none');
          res.body.should.have.property('cons').eql('many');
          res.body.should.have.property('ceoApproval').eql(true);
          res.body.should.have.property('tips').eql('none');
          res.body.should.have.property('companyId').eql('619ad00a17b516a4cbaa9941');
          res.body.should.have.property('userId').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('isFeatured').eql(true);
          res.body.should.have.property('status').eql('PENDING');
          res.body.should.have.property('reviewDate').eql('2020-10-10T07:00:00.000Z');
          res.body.should.have.property('helpful').eql(2);
        }
        done();
      });
  });

  it('it should update the review', (done) => {
    const data = {
      overallRating: 2,
      workLifeBalance: 3,
      compensation: 4,
      jobSecurity: 3,
      management: 4,
      jobCulture: 3,
      summary: 'A Updated Review',
      review: 'A Updated good review',
      pros: 'none',
      cons: 'many',
      ceoApproval: true,
      tips: 'none',
      companyId: '619ad00a17b516a4cbaa9941',
      userId: '616eee906f354a1864dc650d',
      isFeatured: true,
      status: 'APPROVED',
      reviewDate: '10/10/2020',
      helpful: 2,
    };

    chai
      .request(app)
      .put(`/reviews/${createdReview}`)
      .send(data)
      .set('Authorization', 'secrettoken')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(200);
          res.body.should.have.property('overallRating').eql(2);
          res.body.should.have.property('workLifeBalance').eql(3);
          res.body.should.have.property('compensation').eql(4);
          res.body.should.have.property('jobSecurity').eql(3);
          res.body.should.have.property('management').eql(4);
          res.body.should.have.property('jobCulture').eql(3);
          res.body.should.have.property('summary').eql('A Updated Review');
          res.body.should.have.property('review').eql('A Updated good review');
          res.body.should.have.property('pros').eql('none');
          res.body.should.have.property('cons').eql('many');
          res.body.should.have.property('ceoApproval').eql(true);
          res.body.should.have.property('tips').eql('none');
          res.body.should.have.property('companyId').eql('619ad00a17b516a4cbaa9941');
          res.body.should.have.property('userId').eql('616eee906f354a1864dc650d');
          res.body.should.have.property('isFeatured').eql(true);
          res.body.should.have.property('status').eql('APPROVED');
          res.body.should.have.property('reviewDate').eql('2020-10-10T07:00:00.000Z');
          res.body.should.have.property('helpful').eql(2);
        }
        done();
      });
  });
});
