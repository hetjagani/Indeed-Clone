/* eslint-disable import/order */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const acl = require('./acl');
const {
  getAuthMiddleware,
  getAccessMiddleware,
  getRedisRequestMiddleware,
  getRedisResponseMiddleware,
} = require('u-server-utils');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);
const cors = require('cors');
const validate = require('./util/authValidator');

const employerRouter = require('./routes/employer.route');
const companyRouter = require('./routes/company.route');
const jobRouter = require('./routes/alljobs.route');
const mediaRouter = require('./routes/media.route');
// const { getRedisResponseMiddleware, getRedisRequestMiddleware } = require('./util/redis');

// all middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age', 1728000);
  next();
});

const options = {
  swaggerDefinition: {
    info: {
      description: 'Company Information Server for Indeed',
      title: 'Company Information Server',
      version: '1.0.0',
    },
    host: 'localhost:7001',
    produces: ['application/json'],
    schemes: ['http'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT auth token',
      },
    },
  },
  // eslint-disable-next-line no-undef
  basedir: __dirname,
  files: ['./routes/**/*.js'], // Path to the API handle folder
};

expressSwagger(options);

app.use(getRedisRequestMiddleware('company'));
app.use(getRedisResponseMiddleware('company'));

app.use('/employers', getAuthMiddleware(validate), employerRouter);
app.use('/companies', getAuthMiddleware(validate), companyRouter);
app.use('/jobs', jobRouter);
app.use('/media', getAuthMiddleware(validate), mediaRouter);

module.exports = app;
