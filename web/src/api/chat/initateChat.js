import axiosInstance from '../../config/axiosConfig';

const initateChat = (payload) => axiosInstance
  .post('/chats', payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default initateChat;
