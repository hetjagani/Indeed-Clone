import axiosInstance from '../../config/axiosConfig';

const getEmployerByID = async (id) => axiosInstance.get(`/employers/${id}`);

export default getEmployerByID;
