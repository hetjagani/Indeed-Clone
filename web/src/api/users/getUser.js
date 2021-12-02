import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const getUserByID = async (userID) => axiosInstance(`/users/${userID}`, {
  method: 'GET',
  headers: {
    Authorization: token,
  },
});

export default getUserByID;
