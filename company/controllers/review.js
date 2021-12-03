const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { errors } = require('u-server-utils');
const { Company } = require('../model');
const { Types } = require('mongoose');

const getCompanyReviews = async (req, res) => {
  try {
    const { page, limit, sortBy, sortOrder, isFeatured, all } = req.query;
    const { compId } = req.params;

    let status = 'APPROVED';
    if (all == 'true') {
      status = '';
    }

    const reviewResp = await axios.get(`${global.gConfig.review_url}/reviews`, {
      params: { page, limit, companyId: compId, sortBy, sortOrder, isFeatured, status },
      headers: { Authorization: req.headers.authorization },
    });

    const allCompany = await Company.find({});
    const companyMap = new Map();

    allCompany.forEach((ele) => {
      companyMap.set(String(ele._id), ele);
    });

    reviewResp.data.nodes.forEach((ele) => {
      ele.company = companyMap.get(String(ele.companyId));
    });

    const allUsers = await axios.get(`${global.gConfig.user_url}/users`, {
      params: { all: 'true' },
      headers: { Authorization: req.headers.authorization },
    });

    const userMap = new Map();

    allUsers.data.nodes.forEach((ele) => {
      userMap.set(String(ele._id), ele);
    });

    reviewResp.data.nodes.forEach((ele) => {
      ele.user = userMap.get(String(ele.userId));
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

    const oneCompany = await Company.findOne({
      _id: Types.ObjectId(compId),
    });

    reviewResp.data.company = oneCompany;
    console.log(reviewResp.data);

    const oneUser = await axios.get(`${global.gConfig.user_url}/users/${reviewResp.data.userId}`, {
      headers: { Authorization: req.headers.authorization },
    });

    reviewResp.data.user = oneUser.data;
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
