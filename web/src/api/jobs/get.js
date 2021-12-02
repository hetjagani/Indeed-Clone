/* eslint-disable implicit-arrow-linebreak */
// import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const getJobs = async (params) =>
  axiosInstance.get('/jobs', {
    params,
  });
export default getJobs;
