import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const postCompany = async (body) => axiosInstance.post(
  '/companies',
  body,
  {
    headers: {
      Authorization: token,
    },
  },
).then((response) => response);

export default postCompany;
