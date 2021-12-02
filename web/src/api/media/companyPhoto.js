import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const companyPhoto = (payload, userId) => axiosInstance
  .post(`/users/${userId}/photos`, payload, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response);

export default companyPhoto;
