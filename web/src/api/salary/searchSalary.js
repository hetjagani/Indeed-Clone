import axiosInstance from '../../config/axiosConfig';

const searchSalary = (payload) => axiosInstance
  .get('/salaries', {
    params: payload,
  })
  .then((response) => response);

export default searchSalary;
