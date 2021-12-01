import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const postEmployers = async (body) => axiosInstance.post(
  '/employers',
  body,
  {
    headers: {
      Authorization: token,
    },
  },
).then((response) => response);

export default postEmployers;
