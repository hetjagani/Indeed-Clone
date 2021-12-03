/* eslint-disable no-underscore-dangle */
const { errors } = require('u-server-utils');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { User } = require('../model');

const getUserReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      page, limit, sortBy, sortOrder, isFeatured,
    } = req.query;

    const result = await axios.get(`${global.gConfig.review_url}/reviews`, {
      params: {
        userId: id, page, limit, sortBy, sortOrder, isFeatured,
      },
      headers: { Authorization: req.headers.authorization },
    });

    const allUser = await User.find({
      _id: Types.ObjectId(id),
    });

    const userMap = new Map();

    allUser.forEach((ele) => {
      userMap.set(String(ele._id), ele);
    });

    result.data.nodes.forEach((ele) => {
      ele.user = userMap.get(String(ele.userId));
    });

    const allCompany = await axios.get(
      `${global.gConfig.company_url}/companies`,
      {
        params: { all: 'true' },
        headers: { Authorization: req.headers.authorization },
      },
    );

    const companyMap = new Map();

    allCompany.data.forEach((ele) => {
      companyMap.set(String(ele._id), ele);
    });

    result.data.nodes.forEach((ele) => {
      ele.company = companyMap.get(String(ele.companyId));
    });

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getUserReviewById = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const result = await axios.get(`${global.gConfig.review_url}/reviews/${reviewId}`, {
      params: { userId: id },
      headers: { Authorization: req.headers.authorization },
    });

    const oneUser = await User.findOne({
      _id: Types.ObjectId(id),
    });

    result.data.user = oneUser;

    const oneCompany = await axios.get(
      `${global.gConfig.company_url}/companies/${result.data.companyId}`,
      {
        headers: { Authorization: req.headers.authorization },
      },
    );

    result.data.company = oneCompany.data;

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createUserReview = async (req, res) => {
  try {
    const { user } = req.headers;
    if (user !== req.params.id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const data = req.body;

    data.isFeatured = false;
    data.status = 'PENDING';
    data.userId = user;
    data.helpful = 0;

    const response = await axios.post(`${global.gConfig.review_url}/reviews`, data, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    if (!response) {
      res.status(500).json(errors.serverError);
      return;
    }

    if (response.status === 201) res.status(201).json(response.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const updateUserReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const { user } = req.headers;

    if (user !== id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const data = req.body;
    data.userId = id;

    const result = await axios.put(`${global.gConfig.review_url}/reviews/${reviewId}`, data, {
      params: { userId: id },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const deleteUserReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const { user } = req.headers;
    if (user !== id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    const result = await axios.delete(`${global.gConfig.review_url}/reviews/${reviewId}`, {
      params: { userId: id },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(result.data);
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
  getUserReviews,
  getUserReviewById,
  createUserReview,
  deleteUserReview,
  updateUserReview,
};
