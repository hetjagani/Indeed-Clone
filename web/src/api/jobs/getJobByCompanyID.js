import axiosInstance from '../../config/axiosConfig';

const getJobByCompanyID = async (companyID, params) => axiosInstance.get(`/companies/${companyID}/jobs`, {
  params,
});

export default getJobByCompanyID;
