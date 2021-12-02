/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axiosInstance from '../../config/axiosConfig';

const updateReview = async (payload, flag) => {
  if (flag === 'up') {
    payload.helpful += 1;
  } else if (payload.helpful > 0) {
    payload.helpful -= 1;
  }

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

export default updateReview;
