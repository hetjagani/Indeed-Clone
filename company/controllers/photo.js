const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { errors } = require('u-server-utils');

const getCompanyPhotos = async (req, res) => {
  try {
    const { page, limit, isFeatured, all } = req.query;
    const { compId } = req.params;

    let status = 'APPROVED';
    if (all == 'true') {
      status = '';
    }

    const photoResp = await axios.get(`${global.gConfig.photos_url}/photos`, {
      params: { page, limit, companyId: compId, isFeatured, status },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(photoResp.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getCompanyPhotoById = async (req, res) => {
  try {
    const { compId, photoId } = req.params;

    const photoResp = await axios.get(`${global.gConfig.photos_url}/photos/${photoId}`, {
      params: { companyId: compId },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(photoResp.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const updateCompanyPhoto = async (req, res) => {
  try {
    const { compId, photoId } = req.params;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const { isFeatured } = req.body;

    const response = await axios.put(
      `${global.gConfig.photos_url}/photos/${photoId}`,
      { isFeatured },
      {
        params: { companyId: compId },
        headers: { Authorization: req.headers.authorization },
      },
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getCompanyPhotoById,
  getCompanyPhotos,
  updateCompanyPhoto,
};
