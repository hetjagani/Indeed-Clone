import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const postJob = (compId, payload) => axiosInstance
  .post(`/companies/${compId}/jobs`, payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default postJob;
