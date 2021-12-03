import axiosInstance from '../../config/axiosConfig';

const getUserReviews = (userId) => axiosInstance
  .get(`/users/${userId}/reviews`)
  .then((response) => response)
  .catch((err) => {
    console.log('error', err);
  });

export default getUserReviews;
