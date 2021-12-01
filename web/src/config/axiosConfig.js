/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import axios from 'axios';
import toast from 'react-hot-toast';
import { getCookie } from 'react-use-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (!token && (config.url !== '/auth/signup' || config.url !== '/auth/login')) {
    window.location.href = '/login';
  }
  config.headers.Authorization = token;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      toast.error('Network error!');
    }
    // if (err && err.response && err.response.status === 401) {
    //   toast.error('Unauthorized request!');
    //   return;
    // }
    // if (err && err.response && err.response.status === 403) {
    //   toast.error(err.response.data.message);
    //   return;
    // }
    // if (err && err.response && err.response.data && err.response.data.error) {
    //   toast.error(err.response.data.error);
    //   return;
    // }
    // if (err && err.response && err.response.data && err.response.data.message) {
    //   toast.error(err.response.data.message);
    // }
  },
);

export default axiosInstance;
