const { Types } = require('mongoose');
const { getReviewConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Review } = getReviewConnection();

  try {
    await Review.deleteOne({ _id: Types.ObjectId(msg.id) });
    callback(null, { success: true });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
