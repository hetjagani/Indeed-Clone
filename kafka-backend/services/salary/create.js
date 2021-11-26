const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { Salary } = getUserConnection();
  try {
    const salary = await Salary.create(msg);
    callback(null, salary);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
