import axiosInstance from '../../config/axiosConfig';

const getChatInfo = async (id) => axiosInstance.get(`/chats/${id}`);

export default getChatInfo;
