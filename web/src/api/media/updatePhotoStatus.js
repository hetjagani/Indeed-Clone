/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axiosInstance from '../../config/axiosConfig';

const updatePhotoStatus = async (status, payload) => {
  payload.status = status;
  const photoId = payload._id;
  console.log('update payload', payload);

  await axiosInstance
    .put(`/photos/${photoId}`, payload)
    .then((response) => response);
};

export default updatePhotoStatus;
