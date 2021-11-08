const kafka = require('kafka-node');

const createKafkaTopics = (client) => {
  const admin = new kafka.Admin(client);
  admin.createTopics(
    [
      {
        topic: 'response',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'restaurant.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'restaurant.update',
        partitions: 1,
        replicationFactor: 1,
      },
    ],
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
};

const initKafkaProducer = (callback) => {
  const client = new kafka.KafkaClient({
    kafkaHost: global.gConfig.kafka_host,
  });
  global.KafkaProducer = new kafka.Producer(client);
  global.KafkaConsumer = new kafka.Consumer(client, [{ topic: 'response', partitions: 1 }]);

  global.KafkaProducer.on('ready', (err) => {
    if (!err) {
      console.log('restaurant producer ready...');
      callback(client);
    } else {
      console.error(err);
    }
  });
};

const sendData = (topic, data, callback) => {
  global.KafkaProducer.send(
    [{ topic, messages: JSON.stringify(data), partitions: 1 }],
    (err, d) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log('SENT DATA:', d);
      }
    },
  );

  global.KafkaConsumer.on('message', (m) => {
    const resp = JSON.parse(m.value);
    if (resp.isError) {
      callback(resp, null);
    } else {
      callback(null, resp.data);
    }
  });
};

module.exports = {
  initKafkaProducer,
  createKafkaTopics,
  sendData,
};
