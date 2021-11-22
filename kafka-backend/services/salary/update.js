const { getUserConnection } = require('../../dbconnections');
const mongoose = require('mongoose');

const handle_request = async (msg, callback) => {
  const { Salary } = getUserConnection();
  const salaryId = msg.salaryId;
  delete msg.salaryId;
  delete msg.id;
  try {
    const salary = await Salary.findOneAndUpdate(
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
    if (salary.companyId && salary.companyId !== null) {
      const companyId = String(salary.companyId);
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
    salary.company = company;
    callback(null, salary);
  } catch (err) {
    callback({ isError: true, error: err.toString() });
  }
};

module.exports = handle_request;
