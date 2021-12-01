import axiosInstance from '../../config/axiosConfig';

const getCompanies = async (params) => axiosInstance('/companies', {
  method: 'GET',
  params,
});

export default getCompanies;
