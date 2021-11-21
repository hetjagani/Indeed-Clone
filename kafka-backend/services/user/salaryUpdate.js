const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { UserSalary } = getUserConnection();
  console.log('custom message', msg);
  const salaryId = msg.salaryId;
  delete msg.salaryId;
  delete msg.id;

  try {
    const userSalary = await UserSalary.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(String(salaryId)),
      },
      {
        $set: msg,
      },
      {
        new: true,
      }
    );

    let company;
    if (userSalary.companyId && userSalary.companyId !== null) {
      const companyId = String(userSalary.companyId);
      try {
        company = await axios.get(`${global.gConfig.company_url}/companies/${companyId}`, {
          headers: { authorization: msg.authorization },
        });
      } catch (err) {
        if (err.isAxiosError && err.response.status === 404) {
          return res.status(404).send({ error: 'Company Does not exist!' });
        }
      }
    }
    userSalary.company = company;
    callback(null, userSalary);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
