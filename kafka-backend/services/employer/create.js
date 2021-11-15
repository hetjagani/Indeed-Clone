const { getCompanyConnection } = require('../../dbconnections');

const handle_request = async (msg, callback) => {
  const { Employer } = getCompanyConnection();

  // TODO: add employer to the company if companyId provided
  try {
    const employer = await Employer.create(msg);
    callback(null, employer);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
