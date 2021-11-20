const { getUserConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {

  const { UserSalary } = getUserConnection();
  try {
    const userSalary = await UserSalary.create(msg);
    callback(null, userSalary);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
