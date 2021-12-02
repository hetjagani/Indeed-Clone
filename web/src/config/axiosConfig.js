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
  if ((config.url === '/auth/signup' || config.url === '/auth/login')) {
    return config;
  }
  if (!token) {
    // eslint-disable-next-line no-undef
    window.location.href = '/login';
  }
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      toast.error('Network error!');
    }
    if (err && err.response && err.response.status === 401) {
      if (err.response.data && err.response.data.message) {
        console.log(err.response.data.message);
      }
      toast.error('Unauthorized request!');
      return;
    }
    if (err && err.response && err.response.status === 403) {
      if (err.response.data.message && typeof (err.response.data.message) === 'string') {
        toast.error(err.response.data.message);
      } else {
        toast.error('Forbidden request!');
      }
      return;
    }
    if (err && err.response && err.response.data && err.response.data.error) {
      if (typeof (err.response.data.message) === 'string') {
        toast.error(err.response.data.error);
      } else {
        toast.error('Forbidden request!');
      }
      return;
    }
    if (err && err.response && err.response.data && err.response.data.message) {
      if (typeof (err.response.data.message) === 'string') {
        toast.error(err.response.data.message);
      } else {
        console.log(err.response.data.message);
      }
    }
  },
);

export default axiosInstance;
