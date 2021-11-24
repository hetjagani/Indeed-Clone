import Cookies from 'universal-cookie';
import axiosInstance from '../../config/axiosConfig';

const cookies = new Cookies();
const token = cookies.get('token');

const getCompanies = async (params) => axiosInstance('/companies', {
  method: 'GET',
  headers: {
    Authorization: token,
  },
  params,
}).then((response) => response);

export default getCompanies;
