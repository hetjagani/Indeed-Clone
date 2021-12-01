import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const upload = (payload) => axiosInstance
  .post('/users/media', payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response);

export default upload;
