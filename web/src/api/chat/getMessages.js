import axiosInstance from '../../config/axiosConfig';

const getMessages = async (id, params) => axiosInstance.get(`/chats/${id}/messages`, { params });
export default getMessages;
