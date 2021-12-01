const { Types } = require('mongoose');
const { getReviewConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Review } = getReviewConnection();

  try {
    console.log('msg', msg);
    const review = await Review.create(msg);

    callback(null, review);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
