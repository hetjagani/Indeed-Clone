/* eslint-disable global-require */
/* eslint-disable camelcase */
const rpc = new (require('./kafkarpc'))();

// make request to kafka
function makeRequest(queue_name, msg_payload, callback) {
  console.log('SENT TO KAFKA');
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, (err, response) => {
    if (err) callback(err, null);
    else {
      callback(null, response);
    }
  });
}

module.exports = { makeRequest };
