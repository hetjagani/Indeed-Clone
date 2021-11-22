const { Types } = require('mongoose');
const { getApplicationConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Application } = getApplicationConnection();

  try {
    await Application.updateOne(
      { _id: Types.ObjectId(msg.id) },
      {
        resume: msg.data.resume,
        coverLetter: msg.data.coverLetter,
        status: msg.data.status,
      },
    );

    callback(null, { _id: msg.id });
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
