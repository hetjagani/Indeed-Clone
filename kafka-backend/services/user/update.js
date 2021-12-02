const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { User } = getUserConnection();
  console.log(msg);
  const custId = msg._id;

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(String(custId)),
      },
      {
        $set: msg,
      },
      {
        new: true,
      }
    );
    callback(null, user);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
