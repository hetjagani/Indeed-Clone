/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Review } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllReviews = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const companyCount = await Company.count();

  const companyList = await Company.aggregate([
    {
      $lookup: {
        from: 'employers',
        localField: 'employers',
        foreignField: '_id',
        as: 'employers',
      },
    },
  ])
    .skip(offset)
    .limit(limit);

  res.status(200).json({ total: companyCount, nodes: companyList });
};

const getReviewById = async (req, res) => {
  const { id } = req.params;

  const companyList = await Company.aggregate([
    { $match: { _id: Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'employers',
        localField: 'employers',
        foreignField: '_id',
        as: 'employers',
      },
    },
  ]);

  if (companyList.length === 0) {
    res.status(404).json(errors.notFound);
    return;
  }

  res.status(200).json(companyList[0]);
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
