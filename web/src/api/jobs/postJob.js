import axiosInstance from '../../config/axiosConfig';

const postJob = (payload, companyID) => axiosInstance
  .post(`/companies/${companyID}/jobs`, payload)
  .then((response) => response);

export default postJob;
