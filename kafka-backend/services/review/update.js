const { Types } = require('mongoose');
const { getReviewConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Review } = getReviewConnection();

  try {
    await Review.updateOne({ _id: Types.ObjectId(msg.id) }, msg.data);

    const newReview = await Review.findOne({ _id: Types.ObjectId(msg.id) });
    
    callback(null, newReview);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
