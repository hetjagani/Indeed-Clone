const { validationResult } = require('express-validator');
const { makeRequest } = require('../util/kafka/client');
const { errors, getPagination } = require('u-server-utils');
const { User } = require('../model');
const mongoose = require('mongoose');
const { default: axios } = require('axios');

const createUserSalary = async (req, res) => {
  const { user } = req.headers;
  console.log(req.headers);
  console.log(user, req.params.id);
  if (user !== req.params.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'user.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  if (req.body.companyId === null || req.body.companyId === undefined) {
    return res.status(404).send({ error: 'Company Id Not Found' });
  }

  let company;
  try {
    company = await axios.get(`${global.gConfig.company_url}/companies/${req.body.companyId}`, {
      headers: { authorization: req.headers.authorization },
    });
  } catch (err) {
    if (err.isAxiosError && err.response.status === 404) {
      return res.status(404).send({ error: 'Company Does not exist!' });
    }
  }

  const userSalaryObj = req.body;

  makeRequest('userSalary.create', userSalaryObj, (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }
    if (company.data) {
      resp.company = company.data;
    }

    res.status(201).json(resp);
  });
};

module.exports = {
  createUserSalary,
};
