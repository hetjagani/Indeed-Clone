import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const putCompany = async (body, id) => axiosInstance.put(
  `/companies/${id}`,
  body,
  {
    headers: {
      Authorization: token,
    },
  },
).then((response) => response);

export default putCompany;
