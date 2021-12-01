import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const searchSalary = (payload) => axiosInstance
  .get('/salaries', {
    headers: {
      Authorization: token,
    },
    params: payload,
  })
  .then((response) => response);

export default searchSalary;
