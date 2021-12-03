import axiosInstance from '../../config/axiosConfig';

const getReviewsOfCompany = (payload, sortBy = 'overallRating', page, limit, all) => axiosInstance
  .get(`/companies/${payload}/reviews`, {
    params: {
      sortBy,
      page,
      limit,
      all,
    },
  })
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default getReviewsOfCompany;
