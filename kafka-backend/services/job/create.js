const { Types } = require('mongoose');
const { getCompanyConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Job } = getCompanyConnection();

  try {
    const job = await Job.create(msg);

    callback(null, job);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
