import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');
const getUsers = async (params) => axiosInstance('/users', {
  method: 'GET',
  headers: {
    Authorization: token,
  },
  params,
});

export default getUsers;
