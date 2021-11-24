/* eslint-disable no-undef */
import axios from 'axios';
// import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
    // if (err.response.status === 401) {
    //   toast.error('Unauthorized!');
    //   return;
    // }
    // if (err.response.status === 403) {
    //   toast.error(err.response.data.message);
    //   window.location.pathname = '/';
    //   return;
    // }
    // if (err.response.data && err.response.data.error) {
    //   toast.error(err.response.data.error);
    //   return;
    // }
    // toast.error(err.response.data.message);
  },
);

export default axiosInstance;
