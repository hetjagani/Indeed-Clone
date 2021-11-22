const { getUserConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { User } = getUserConnection();
  try {
    const user = await User.create(msg);
    callback(null, user);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
