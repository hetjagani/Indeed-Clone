import axiosInstance from '../../config/axiosConfig';

const postApplication = (payload, id) => axiosInstance
  .post(`/users/${id}/applications`, payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default postApplication;
