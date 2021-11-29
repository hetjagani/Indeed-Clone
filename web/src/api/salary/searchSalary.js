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
  .then((response) => {
    console.log('text', response.data.nodes);
    return response.data.nodes;
  })
  .catch((err) => {
    console.log(err);
  });

export default searchSalary;
