/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { errors, getPagination } = require('u-server-utils');
const { default: axios } = require('axios');
const { makeRequest } = require('../util/kafka/client');
const { User } = require('../model');

const getUsersByReviews = async (auth) => {
  const reviewResponse = await axios.get(`${global.gConfig.review_url}/reviews`, {
    params: { all: true },
    headers: { Authorization: auth },
  });

  const userReviewMap = new Map();
  reviewResponse.data.forEach((re) => {
    if (re.status === 'ACCEPTED') {
      if (userReviewMap.has(re.userId)) {
        userReviewMap.set(re.userId, userReviewMap.get(re.userId) + 1);
      } else {
        userReviewMap.set(re.userId, 1);
      }
    }
  });

  const sortedReviewMap = new Map([...userReviewMap.entries()].sort((a, b) => b[1] - a[1]));

  return Array.from(sortedReviewMap.keys()).slice(0, 5);
};

const createUser = async (req, res) => {
  const { user } = req.headers;
  console.log(user);
  console.log(req.body.id);
  if (user !== req.body.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'employer.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const userObj = req.body;
  userObj._id = userObj.id;

  makeRequest('user.create', userObj, (err, resp) => {
    if (err || !resp) {
      console.log(err);
      res.status(500).json(errors.serverError);
      return;
    }
    res.status(201).json(resp);
  });
};

const getAllUsers = async (req, res) => {
  try {
    let { limit, offset } = getPagination(req.query.page, req.query.limit);

    const usersCount = await User.count();

    if (req.query.all === 'true') {
      limit = usersCount;
      offset = 0;
    }

    if (req.query.byReviews && req.query.byReviews == 'true') {
      const userIds = await getUsersByReviews(req.headers.authorization);
      const userList = await User.find({ _id: { $in: userIds } });
      res.status(200).json(userList);
      return;
    }

    const userList = await User.find({}).skip(offset).limit(limit);

    res.status(200).json({ total: usersCount, nodes: userList });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json(errors.notFound);
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == 0) {
      res.status(400).json(errors.badRequest);
      return;
    }

    const { user } = req.headers;
    if (user != id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id should be same as logged in user',
      });
      return;
    }

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const userObj = req.body;
    userObj._id = id;

    makeRequest('user.update', userObj, (err, resp) => {
      if (err || !resp) {
        console.log(err);
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

const deleteUser = async (req, res) => {
  makeRequest('user.delete', req.params, (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }
    res.status(200).json(null);
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
