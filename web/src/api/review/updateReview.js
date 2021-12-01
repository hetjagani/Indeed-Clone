/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const updateReview = async (payload, flag) => {
  if (flag === 'up') {
    payload.helpful += 1;
  } else if (payload.helpful > 0) {
    payload.helpful -= 1;
  }
  await axiosInstance
    .put(`/reviews/${payload._id}`, payload, {
      headers: {
        Authorization: token,
      },
      params: {
        userId: payload.userId,
        companyId: payload.companyId,
      },
    })
    .then((response) => { console.log(response); })
    .catch((err) => {
      console.log('error', err);
    });
};

export default updateReview;
