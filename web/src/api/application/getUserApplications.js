import axiosInstance from '../../config/axiosConfig';

const getUserApplications = (userId) => axiosInstance
  .get(`/users/${userId}/applications`)
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default getUserApplications;
