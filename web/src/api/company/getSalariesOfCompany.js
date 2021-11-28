import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const getSalariesOfCompany = (payload) => axiosInstance
  .get(`/companies/${payload}/salaries`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response.data.nodes)
  .catch((err) => {
    console.log(err);
  });

export default getSalariesOfCompany;
