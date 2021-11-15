const { getOrderConnection } = require('../../dbconnections');

const handle_request = (msg, callback) => {
  console.log(msg);
};

module.exports = handle_request;
