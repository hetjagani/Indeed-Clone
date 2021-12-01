import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const postApplication = (payload, id) => axiosInstance
  .post(`/users/${id}/applications`, payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default postApplication;
