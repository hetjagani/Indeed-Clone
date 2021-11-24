const kafka = require('kafka-node');

const createKafkaTopics = () => {
  const client = new kafka.KafkaClient({
    kafkaHost: global.gConfig.kafka_host,
  });
  const admin = new kafka.Admin(client);
  admin.createTopics(
    [
      {
        topic: 'response_topic',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'user.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'user.update',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'user.delete',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'salary.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'salary.update',
        partitions: 1,
        replicationFactor: 1,
      },{
        topic: 'salary.delete',
        partitions: 1,
        replicationFactor: 1,
      }
    ],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};

module.exports = {
  createKafkaTopics,
};
