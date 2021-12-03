import axiosInstance from '../../config/axiosConfig';

const sendMessage = (payload, id) => axiosInstance
  .post(`/chats/${id}/messages`, payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default sendMessage;
