import axiosInstance from '../../config/axiosConfig';

const getUser = async (params) => axiosInstance.get(`/users/${params}`, {});

export default getUser;
