const { getCompanyConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Employer } = getCompanyConnection();

  try {
    await Employer.deleteOne({ _id: msg.id });
    callback(null, { success: true });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
