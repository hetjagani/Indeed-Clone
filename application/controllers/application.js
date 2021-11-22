/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Application } = require('../model');
const { makeRequest } = require('../util/kafka/client');

// TODO: add job object in response
const getApplications = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const applicationCount = await Application.count();
  const applicationList = await Application.find({}).skip(offset).limit(limit);

  res.status(200).json({ total: applicationCount, nodes: applicationList });
};

const getApplicationById = async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(Types.ObjectId(id));
  if (!application) {
    res.status(404).json(errors.notFound);
    return;
  }

  res.status(200).json(application);
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
    res.status(201).json(resp);
  });
};

// TODO: only employer should be able to update status
const updateApplication = async (req, res) => {
  const { id } = req.params;

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const application = req.body;

  const dbApplication = await Application.findById(Types.ObjectId(id));
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

      res.status(200).json(result);
    },
  );
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
