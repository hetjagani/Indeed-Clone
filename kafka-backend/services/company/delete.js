const { Types } = require('mongoose');
const { getCompanyConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Company } = getCompanyConnection();

  try {
    await Company.deleteOne({ _id: Types.ObjectId(msg.id) });
    callback(null, { success: true });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
