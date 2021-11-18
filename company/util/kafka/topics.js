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
        topic: 'employer.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'employer.update',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'employer.delete',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'company.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'company.update',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'company.delete',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'job.create',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'job.update',
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: 'job.delete',
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

module.exports = {
  createKafkaTopics,
};
