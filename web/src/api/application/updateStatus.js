import axiosInstance from '../../config/axiosConfig';

const updateStatus = (payload, compId, appId) => axiosInstance
  .put(`/companies/${compId}/applications/${appId}`, payload, {})
  .then((response) => response)
  .catch((err) => {
    console.log(err);
  });

export default updateStatus;
