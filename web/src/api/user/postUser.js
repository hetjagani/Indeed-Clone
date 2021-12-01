import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const postUser = (payload) => axiosInstance
  .post('/users', payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default postUser;
