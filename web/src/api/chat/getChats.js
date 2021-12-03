import axiosInstance from '../../config/axiosConfig';

const getChats = async () => axiosInstance.get('/chats');
export default getChats;
