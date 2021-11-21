const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  console.log('customer message', msg);
  const { UserSalary } = getUserConnection();
  try {
    const userSalary = await UserSalary.create(msg);
    callback(null, userSalary);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
