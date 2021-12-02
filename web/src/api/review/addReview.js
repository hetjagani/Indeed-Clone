import axiosInstance from '../../config/axiosConfig';

const addReview = (payload) => axiosInstance
  .post('/reviews', payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log('error', err);
  });

export default addReview;
