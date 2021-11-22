/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Review } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllReviews = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const queryObj = {};
  if (req.query.userId) {
    queryObj.userId = Types.ObjectId(req.query.userId);
  }
  if (req.query.companyId) {
    queryObj.companyId = Types.ObjectId(req.query.companyId);
  }

  const reviewCount = await Review.count(queryObj);

  const reviewList = await Review.aggregate([
    {
      $match: queryObj,
    },
  ])
    .skip(offset)
    .limit(limit);

  res.status(200).json({ total: reviewCount, nodes: reviewList });
};

const getReviewById = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({
    _id: Types.ObjectId(id),
  });

  if (!review) {
    res.status(404).json(errors.notFound);
    return;
  }

  res.status(200).json(review);
};

const createReview = async (req, res) => {
  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  req.body.companyId = Types.ObjectId(req.body.companyId);
  req.body.userId = Types.ObjectId(req.body.userId);
  const review = req.body;

  makeRequest('review.create', review, async (err, resp) => {
    if (err) {
      res.status(500).json(errors.serverError);
      return;
    }

    res.status(201).json(resp);
  });
};

const updateReview = async (req, res) => {
  const { id } = req.params;

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  req.body.companyId = Types.ObjectId(req.body.companyId);
  req.body.userId = Types.ObjectId(req.body.userId);
  const review = req.body;

  makeRequest('review.update', { id: id, data: review }, async (err, resp) => {
    if (err) {
      res.status(500).json(errors.serverError);
      return;
    }

    res.status(200).json(resp);
  });
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  makeRequest('review.delete', { id: id }, async (err, resp) => {
    if (err) {
      res.status(500).json(errors.serverError);
      return;
    }

    if (resp.success) {
      res.status(200).json(null);
    } else {
      res.status(500).json(errors.serverError);
    }
  });
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
