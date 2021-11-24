const { Types } = require('mongoose');
const { getApplicationConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Application } = getApplicationConnection();

  try {
    await Application.deleteOne({ _id: Types.ObjectId(msg.id) });
    callback(null, { success: true });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
