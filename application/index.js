/* eslint-disable global-require */
const http = require('http');
require('./config');
const { initDB } = require('./db');
const app = require('./app');
const { createKafkaTopics } = require('./util/kafka/topics');
const { redisClient } = require('u-server-utils');

initDB();
createKafkaTopics();
redisClient.connect().then(() => {
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
});
