/* eslint-disable global-require */
const http = require('http');
require('./config');
const { initDB } = require('./db');
const app = require('./app');
const { initKafkaProducer, createKafkaTopics } = require('./util/kafka');

initDB();
initKafkaProducer(createKafkaTopics);
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
