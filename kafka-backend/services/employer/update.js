const { getCompanyConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Employer } = getCompanyConnection();

  try {
    delete msg.data.companyId;
    await Employer.updateOne({ _id: msg.id }, msg.data);
    callback(null, { _id: msg.id });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
