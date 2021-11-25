import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const getJobs = async (params) => {
  const token = getCookie('token');
  return axiosInstance.get('/jobs', {
    headers: {
      Authorization: token,
    },
    params,
  });
};

export default getJobs;
