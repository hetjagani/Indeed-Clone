/* eslint-disable no-underscore-dangle */
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Application } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllJobs = async (auth) => {
  const response = await axios.get(`${global.gConfig.company_url}/jobs`, {
    params: { all: true },
    headers: { Authorization: auth },
  });
  if (!response) {
    throw Error('something went wrong');
  }

  const jobsList = response.data;

  const jobMap = {};
  jobsList.forEach((job) => {
    jobMap[job._id] = job;
  });

  return jobMap;
};

const getJob = async (id, auth) => {
  const response = await axios.get(`${global.gConfig.company_url}/jobs/${id}`, {
    headers: { Authorization: auth },
  });
  if (!response) {
    throw Error('something went wrong');
  }

  return response.data;
};

const getAllUsers = async (auth) => {
  const response = await axios.get(`${global.gConfig.user_url}/users`, {
    params: { all: true },
    headers: { Authorization: auth },
  });
  if (!response) {
    throw Error('something went wrong');
  }

  const userList = response.data;

  const userMap = {};
  userList.nodes?.forEach((user) => {
    userMap[user._id] = user;
  });

  return userMap;
};

const getApplications = async (req, res) => {
  try {
    const { userId, jobIds, all } = req.query;
    const whereOpts = {};
    if (userId && userId !== '') {
      whereOpts.userId = Types.ObjectId(userId);
    }

    if (jobIds && jobIds !== '') {
      const jobIdList = String(jobIds)
        .split(',')
        .map((i) => {
          if (i.trim() !== '') return Types.ObjectId(i.trim());
        });
      whereOpts.jobId = { $in: jobIdList };
    }

    const { limit, offset } = getPagination(req.query.page, req.query.limit);

    const jobMap = await getAllJobs(req.headers.authorization);
    const userMap = await getAllUsers(req.headers.authorization);

    const applicationCount = await Application.count(whereOpts);
    let applicationList = [];
    if (all == 'true') {
      applicationList = await Application.find(whereOpts);
    } else {
      applicationList = await Application.find(whereOpts).skip(offset).limit(limit);
    }

    const result = applicationList.map((app) => ({
      ...app._doc,
      job: jobMap[app.jobId],
      user: userMap[app.userId],
    }));

    res.status(200).json({ total: applicationCount, nodes: result });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, jobIds } = req.query;
    const whereOpts = { _id: Types.ObjectId(id) };
    if (userId && userId !== '') {
      whereOpts.userId = Types.ObjectId(userId);
    }

    if (jobIds && jobIds !== '') {
      const jobIdList = String(jobIds)
        .split(',')
        .map((i) => {
          if (i.trim() !== '') return Types.ObjectId(i.trim());
        });
      whereOpts.jobId = { $in: jobIdList };
    }

    const application = await Application.findOne(whereOpts);
    if (!application) {
      res.status(404).json(errors.notFound);
      return;
    }
    const job = await getJob(application.jobId, req.headers.authorization);

    res.status(200).json({ ...application._doc, job });
  } catch (err) {
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createApplication = async (req, res) => {
  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const application = req.body;
  application.date = Date.now();
  application.status = 'RECEIVED';

  makeRequest('application.create', application, async (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).json(errors.serverError);
      return;
    }

    const job = await getJob(resp.jobId, req.headers.authorization);

    res.status(201).json({ ...resp, job });
  });
};

// TODO: only employer should be able to update status
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, jobIds } = req.query;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const whereOpts = { _id: Types.ObjectId(id) };
    if (userId && userId !== '') {
      whereOpts.userId = Types.ObjectId(userId);
    }

    if (jobIds && jobIds !== '') {
      const jobIdList = String(jobIds)
        .split(',')
        .map((i) => {
          if (i.trim() !== '') return Types.ObjectId(i.trim());
        });
      whereOpts.jobId = { $in: jobIdList };
    }

    const application = req.body;

    const dbApplication = await Application.findOne(whereOpts);
    if (!dbApplication) {
      res.status(404).json(errors.notFound);
      return;
    }

    makeRequest(
      'application.update',
      { id: dbApplication._id, data: application },
      async (err, resp) => {
        if (err) {
          console.log(err);
          res.status(500).json(errors.serverError);
          return;
        }

        const result = await Application.findById(Types.ObjectId(resp._id));
        const job = await getJob(result.jobId, req.headers.authorization);

        res.status(200).json({ ...result._doc, job });
      },
    );
  } catch (err) {
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(Types.ObjectId(id));
  if (!application) {
    res.status(404).json(errors.notFound);
    return;
  }

  makeRequest('application.delete', { id: application._id }, (err, resp) => {
    if (err) {
      console.log(err);
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
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
