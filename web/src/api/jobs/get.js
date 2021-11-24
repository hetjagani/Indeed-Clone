import Cookies from 'universal-cookie';
import axiosInstance from '../../config/axiosConfig';

const cookies = new Cookies();
const token = cookies.get('token');

const getJobs = async (params) => axiosInstance('/jobs', {
  method: 'GET',
  headers: {
    Authorization: token,
  },
  params,
}).then((response) => response);

export default getJobs;
