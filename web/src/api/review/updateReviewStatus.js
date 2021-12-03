/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axiosInstance from '../../config/axiosConfig';

const updateReviewStatus = async (payload, approval) => {
  payload.status = approval;
  await axiosInstance
    .put(`/reviews/${payload._id}`, payload, {
      params: {
        userId: payload.userId,
        companyId: payload.companyId,
      },
    })
    .then((response) => response)
    .catch((err) => {
      console.log('error', err);
    });
};

export default updateReviewStatus;
