import axiosInstance from '../../config/axiosConfig';

const putCompany = async (body, id) => axiosInstance.put(
  `/companies/${id}`,
  body,
).then((response) => response);

export default putCompany;
