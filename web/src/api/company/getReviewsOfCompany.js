import axiosInstance from '../../config/axiosConfig';

const getReviewsOfCompany = (payload, sortBy = 'overallRating') => axiosInstance
  .get(`/companies/${payload}/reviews`, {
    params: {
      sortBy,
    },
  })
  .then((response) => response.data.nodes)
  .catch((err) => {
    console.log(err);
  });

export default getReviewsOfCompany;
