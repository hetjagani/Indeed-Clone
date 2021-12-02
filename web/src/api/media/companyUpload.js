import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const companyUpload = (payload) => axiosInstance
  .post('/companies/media', payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response);

export default companyUpload;
