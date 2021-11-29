/* eslint-disable no-underscore-dangle */
const { errors } = require('u-server-utils');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');

const getUserReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit, sortBy, sortOrder } = req.query;

    const result = await axios.get(`${global.gConfig.review_url}/reviews`, {
      params: { userId: id, page, limit, sortBy, sortOrder },
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

const getUserReviewById = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const result = await axios.get(`${global.gConfig.review_url}/reviews/${reviewId}`, {
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
