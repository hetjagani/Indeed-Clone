/* eslint-disable no-underscore-dangle */
const { errors } = require('u-server-utils');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');

const getUserApplications= async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;
    const { user } = req.headers;

    if (user !== id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    const result = await axios.get(`${global.gConfig.application_url}/applications`, {
      params: { userId: id, page: page, limit: limit },
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

const getUserApplicationById = async (req, res) => {
  try {
    const { id, applicationId } = req.params;
    const { user } = req.headers;

    if (user !== id) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'id in path should be same as logged in user',
      });
      return;
    }

    const result = await axios.get(
      `${global.gConfig.application_url}/applications/${applicationId}`,
      {
        params: { userId: id },
        headers: { Authorization: req.headers.authorization },
      },
    );

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

const createUserApplication = async (req, res) => {
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
    data.userId = req.params.id;

    const response = await axios.post(
      `${global.gConfig.application_url}/applications`,
      data,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    );

    if (!response) {
      res.status(500).json(errors.serverError);
      return;
    }

    if (response.status === 201) res.status(201).json(response.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err?.response?.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getUserApplications,
  getUserApplicationById,
  createUserApplication,
};
