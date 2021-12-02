import axiosInstance from '../../config/axiosConfig';

const postUser = (payload) => axiosInstance
  .post('/users', payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default postUser;
