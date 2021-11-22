const { Types } = require('mongoose');
const { getApplicationConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Application } = getApplicationConnection();

  try {
    msg.jobId = Types.ObjectId(msg.jobId);
    msg.userId = Types.ObjectId(msg.userId);
    const createdApp = await Application.create(msg);

    callback(null, createdApp);
  } catch (err) {
    console.log(err);
    callback({ isError: true, error: err });
  }
};

module.exports = handle_request;
