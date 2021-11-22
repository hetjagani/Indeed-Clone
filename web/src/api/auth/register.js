import axiosInstance from '../../config/axiosConfig';

const register = async (payload) => axiosInstance('/auth/signup', {
  method: 'POST',
  data: payload,
})
  .then((response) => response);

export default register;
