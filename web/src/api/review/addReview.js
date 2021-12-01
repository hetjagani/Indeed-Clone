import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const addReview = (payload) => axiosInstance
  .post('/reviews', payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response)
  .catch((err) => {
    console.log('error', err);
  });

export default addReview;
