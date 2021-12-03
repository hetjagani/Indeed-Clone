/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axiosInstance from '../../config/axiosConfig';

const updateReview = async (payload, flag, makeFeatured = false) => {
  if (flag === 'up') {
    payload.helpful += 1;
  } else if (flag === 'down' && payload.helpful > 0) {
    payload.helpful -= 1;
  }

  if (makeFeatured === true) {
    payload.isFeatured = !payload.isFeatured;
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
