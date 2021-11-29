const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { errors } = require('u-server-utils');

const getCompanyReviews = async (req, res) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const { compId } = req.params;

    const reviewResp = await axios.get(`${global.gConfig.review_url}/reviews`, {
      params: { page, limit, companyId: compId, sortBy, sortOrder },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(reviewResp.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getCompanyReviewById = async (req, res) => {
  try {
    const { compId, reviewId } = req.params;

    const reviewResp = await axios.get(`${global.gConfig.review_url}/reviews/${reviewId}`, {
      params: { companyId: compId },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(reviewResp.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const updateCompanyReview = async (req, res) => {
  try {
    const { compId, reviewId } = req.params;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const { isFeatured } = req.body;

    const response = await axios.put(
      `${global.gConfig.review_url}/reviews/${reviewId}`,
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
  getCompanyReviewById,
  getCompanyReviews,
  updateCompanyReview,
};
