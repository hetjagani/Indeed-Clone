const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { User } = getUserConnection();
  try {
    await User.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(String(msg.id)),
    },{
        $pull:{salaries:{salaryId:msg.salaryId}}
    });

    callback(null, { message: 'User Deleted' });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;