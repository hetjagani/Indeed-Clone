import { getCookie } from 'react-use-cookie';
import axiosInstance from '../../config/axiosConfig';

const token = getCookie('token');

const getReviewsOfCompany = (payload, sortBy = 'overallRating') => axiosInstance
  .get(
    `/companies/${payload}/reviews`,
    {
      headers: {
        Authorization: token,
      },
      params: {
        sortBy,
      },
    },
  )
  .then((response) => response.data.nodes)
  .catch((err) => {
    console.log(err);
  });

export default getReviewsOfCompany;
