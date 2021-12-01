import { getCookie } from 'react-use-cookie';

import axiosInstance from '../../config/axiosConfig';

const getUser = async (params) => {
  const token = getCookie('token');
  return axiosInstance.get(`/users/${params}`, {
    headers: {
      Authorization: token,
    },
  });
};

export default getUser;
