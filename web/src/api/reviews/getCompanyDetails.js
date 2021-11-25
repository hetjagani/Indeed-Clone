import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const getCompanyDetails = (payload) => axiosInstance
  .get(`/companies/${payload}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response.data)
  .catch((err) => {
    console.log(err);
  });

export default getCompanyDetails;
