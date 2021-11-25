import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const getCompanies = async (params) => axiosInstance('/companies', {
  method: 'GET',
  headers: {
    Authorization: token,
  },
  params,
});

export default getCompanies;
