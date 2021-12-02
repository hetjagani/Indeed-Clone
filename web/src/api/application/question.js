import axiosInstance from '../../config/axiosConfig';

const question = (payload) => axiosInstance
  .get(`/companies/${payload.compId}/jobs/${payload.id}`, {})
  .then((response) => response);

export default question;
