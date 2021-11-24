/* eslint-disable import/order */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const acl = require("./acl");
const { getAuthMiddleware, getAccessMiddleware } = require('u-server-utils');

const userRouter = require('./routes/user.routes');
const salaryRouter = require('./routes/salary.routes');
const mediaRouter = require('./routes/media.routes');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);
const cors = require('cors');
const validate = require('./util/authValidator');

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
      description: 'User Information Server for Indeed',
      title: 'User Information Server',
      version: '1.0.0',
    },
    host: 'localhost:7002',
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

app.use(getAuthMiddleware(validate));
// app.use(getAccessMiddleware(acl));
app.use('/users', userRouter);
app.use('/salaries', salaryRouter);
app.use('/media', mediaRouter);

module.exports = app;
