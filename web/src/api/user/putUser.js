import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const putUser = async (body, userID) => axiosInstance.put(
  `/users/${userID}`,
  body,
  {
    headers: {
      Authorization: token,
    },
  },
).then((response) => response);

export default putUser;
