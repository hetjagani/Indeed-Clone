import axiosInstance from '../../config/axiosConfig';

const login = async (payload) => axiosInstance('/auth/login', {
  method: 'POST',
  data: payload,
}).then((response) => response);

export default login;
