const { default: axios } = require('axios');
const { errors } = require('u-server-utils');

const getCompanySalaries = async (req, res) => {
  try {
    const { limit, page, isFeatured } = req.query;
    const { compId } = req.params;

    const response = await axios.get(`${global.gConfig.user_url}/salaries`, {
      params: { limit, page, companyId: compId, isFeatured },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getCompanySalaryById = async (req, res) => {
  try {
    const { compId, id } = req.params;

    const result = await axios.get(`${global.gConfig.user_url}/salaries/${id}`, {
      params: { companyId: compId },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getCompanySalaries,
  getCompanySalaryById,
};
