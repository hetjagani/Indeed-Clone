const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { Salary } = getUserConnection();
  try {
    await Salary.findOneAndDelete({
      _id: mongoose.Types.ObjectId(String(msg)),
    });

    callback(null, { message: 'User Salary Deleted' });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;