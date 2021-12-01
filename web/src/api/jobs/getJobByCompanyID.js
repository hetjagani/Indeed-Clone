import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const getJobByCompanyID = async (companyID, params) => {
  const token = getCookie('token');
  return axiosInstance.get(`/companies/${companyID}/jobs`, {
    headers: {
      Authorization: token,
    },
    params,
  });
};

export default getJobByCompanyID;
