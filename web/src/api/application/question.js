import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const question = (payload) => axiosInstance
  .get(`/companies/${payload.compId}/jobs/${payload.id}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response);

export default question;
