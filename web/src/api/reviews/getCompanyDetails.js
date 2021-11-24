import Cookies from 'universal-cookie';
import axiosInstance from '../../config/axiosConfig';

const cookies = new Cookies();
const token = cookies.get('token');

const getCompanyDetails = (payload) => axiosInstance
  .get(`/companies/${payload}`, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => response.data)
  .catch((err) => {
    console.log(err);
  });

export default getCompanyDetails;
