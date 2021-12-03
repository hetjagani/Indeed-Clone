import axiosInstance from '../../config/axiosConfig';

const getSalariesOfCompany = (payload) => axiosInstance
  .get(`/companies/${payload}/salaries`, {})
  .then((response) => response.data.nodes)
  .catch((err) => {
    console.log(err);
  });

export default getSalariesOfCompany;
