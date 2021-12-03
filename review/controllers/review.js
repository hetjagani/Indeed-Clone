/* eslint-disable no-underscore-dangle */
const { validationResult, query } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Review } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getReviewsPerDay = async () => {
  const allReviews = await Review.find({});

  const reviewMap = {};
  allReviews.forEach((review) => {
    if (reviewMap[review.reviewDate]) {
      reviewMap[review.reviewDate].push(review);
    } else {
      reviewMap[review.reviewDate] = [review];
    }
  });

  const reviewsByDate = [];
  Object.entries(reviewMap).forEach(([date, review]) => {
    reviewsByDate.push({
      date,
      review,
    });
  });

  return reviewsByDate;
};

const getAllReviews = async (req, res) => {
  try {
    const { limit, offset } = getPagination(req.query.page, req.query.limit);

    let sortBy = 'reviewDate';
    let sortOrder = 'desc';

    const queryObj = {};
    if (req.query.userId) {
      queryObj.userId = Types.ObjectId(req.query.userId);
    }
    if (req.query.companyId) {
      queryObj.companyId = Types.ObjectId(req.query.companyId);
    }
    if (req.query.sortBy && req.query.sortBy !== '') {
      sortBy = req.query.sortBy;
    }
    if (req.query.sortOrder && req.query.sortOrder !== '') {
      sortOrder = req.query.sortOrder;
    }
    if (req.query.isFeatured && req.query.isFeatured == 'true') {
      queryObj.isFeatured = true;
    } else if (req.query.isFeatured == 'false') {
      queryObj.isFeatured = false;
    }

    if (req.query.status && req.query.status != '') {
      queryObj.status = req.query.status;
    }

    if (req.query.byDate && req.query.byDate == 'true') {
      const reviewsByDate = await getReviewsPerDay();
      res.status(200).json(reviewsByDate);
      return;
    }

    const sortObj = {};
    if (sortBy === 'reviewDate') {
      sortObj[sortBy] = sortOrder === 'desc' ? 1 : -1;
    } else {
      sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    if (req.query.all == 'true') {
      const allReviews = await Review.find(queryObj).sort(sortObj);
      res.status(200).json(allReviews);
      return;
    }

    const reviewCount = await Review.count(queryObj);
    const reviewList = await Review.aggregate([
      {
        $match: queryObj,
      },
    ])
      .sort(sortObj)
      .skip(offset)
      .limit(limit);

    if (req.query.isFeatured == 'true' && reviewList.length > 5) {
      const sortedList = reviewList.sort((a, b) => b.overallRating - a.overallRating);
      const result = [...sortedList.slice(0, 4), ...sortedList.slice(-1)];
      res.status(200).json({ total: reviewCount, nodes: result });
      return;
    }

    res.status(200).json({ total: reviewCount, nodes: reviewList });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const queryObj = {};
    queryObj._id = Types.ObjectId(id);

    if (req.query.userId) {
      queryObj.userId = Types.ObjectId(req.query.userId);
    }
    if (req.query.companyId) {
      queryObj.companyId = Types.ObjectId(req.query.companyId);
    }

    const review = await Review.findOne(queryObj);

    if (!review) {
      res.status(404).json(errors.notFound);
      return;
    }

    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const createReview = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    if (req.body.companyId) {
      req.body.companyId = Types.ObjectId(req.body.companyId);
    }
    if (req.body.userId) {
      req.body.userId = Types.ObjectId(req.body.userId);
    }
    const review = req.body;

    const queryObj = {};
    queryObj._id = Types.ObjectId(id);
    if (req.query.userId) {
      queryObj.userId = Types.ObjectId(req.query.userId);
    }
    if (req.query.companyId) {
      queryObj.companyId = Types.ObjectId(req.query.companyId);
    }

    const checkReview = await Review.findOne(queryObj);

    if (!checkReview) {
      res.status(404).json(errors.notFound);
      return;
    }

    makeRequest('review.update', { id, data: review }, async (err, resp) => {
      if (err) {
        res.status(500).json(errors.serverError);
        return;
      }

      res.status(200).json(resp);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const queryObj = {};
    queryObj._id = id;

    if (req.query.userId) {
      queryObj.userId = Types.ObjectId(req.query.userId);
    }
    if (req.query.companyId) {
      queryObj.companyId = Types.ObjectId(req.query.companyId);
    }

    const checkReview = await Review.findOne(queryObj);

    if (!checkReview) {
      res.status(404).json(errors.notFound);
      return;
    }

    makeRequest('review.delete', { id }, async (err, resp) => {
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
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
