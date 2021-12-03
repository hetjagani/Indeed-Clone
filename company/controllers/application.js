/* eslint-disable no-underscore-dangle */
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { errors } = require('u-server-utils');
const { Job } = require('../model');

const getCompanyApplications = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { compId } = req.params;

    // get all jobIds and get their applications
    const jobs = await Job.find({ companyId: Types.ObjectId(compId) });
    let jobString = '';
    jobs.forEach((item) => {
      jobString = `${item._id},${jobString}`;
    });

    const applicationsResp = await axios.get(`${global.gConfig.application_url}/applications`, {
      params: { page, limit, jobIds: jobString },
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json(applicationsResp.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getCompanyApplicationById = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { compId, appId } = req.params;

    // get all jobIds and get their applications
    const jobs = await Job.find({ companyId: Types.ObjectId(compId) });
    let jobString = '';
    jobs.forEach((item) => {
      jobString = `${item._id},${jobString}`;
    });

    const reviewResp = await axios.get(`${global.gConfig.application_url}/applications/${appId}`, {
      params: { page, limit, jobIds: jobString },
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

const updateCompanyApplication = async (req, res) => {
  try {
    const { compId, appId } = req.params;

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    // get all jobIds and get their applications
    const jobs = await Job.find({ companyId: Types.ObjectId(compId) });
    let jobString = '';
    jobs.forEach((item) => {
      jobString = `${item._id},${jobString}`;
    });

    const { status } = req.body;

    const response = await axios.put(
      `${global.gConfig.application_url}/applications/${appId}`,
      { status },
      {
        params: { jobIds: jobString },
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
  getCompanyApplicationById,
  getCompanyApplications,
  updateCompanyApplication,
};
