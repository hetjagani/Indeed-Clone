import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const addNewSalary = (payload, id) => {
  axiosInstance
    .post(`users/${id}/salaries`, payload, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response).catch((err) => console.log('err', err));
};
export default addNewSalary;
