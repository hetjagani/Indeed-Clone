import axiosInstance from '../../config/axiosConfig';

const upload = (payload) => axiosInstance.post('/users/media', payload, {}).then((response) => response);

export default upload;
