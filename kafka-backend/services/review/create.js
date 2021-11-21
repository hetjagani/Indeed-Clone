const { Types } = require('mongoose');
const { getReviewConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Review } = getReviewConnection();

  try {
    const company = await Company.create(msg.company);

    await Employer.updateOne({ _id: Types.ObjectId(msg.user) }, { companyId: company._id });

    callback(null, company);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
