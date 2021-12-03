/* eslint-disable global-require */
require('./config');
const http = require('http');
const { redisClient } = require('u-server-utils');
const { initDB } = require('./db');

initDB()
  .then(() => {
    const { runMigration } = require('./model');
    return runMigration();
  })
  .then(() => redisClient.connect())
  .then(() => {
    const app = require('./app');
    const port = process.env.PORT || '3000';
    app.set('port', port);
    const server = http.createServer(app);
    server.listen(port);
    server.on('error', (err) => {
      console.error(err);
    });
    server.on('listening', () => {
      console.log(`Server listening on ${server.address().port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
