const { validationResult } = require('express-validator');
const { makeRequest } = require('../util/kafka/client');
const { errors, getPagination } = require('u-server-utils');
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const { Salary } = require('../model');

const createSalary = async (req, res) => {
  const { user } = req.headers;
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
    return res.status(404).send({ status: 400, message: 'Company Id Not Found' });
  }

  let company;
  try {
    company = await axios.get(`${global.gConfig.company_url}/companies/${req.body.companyId}`, {
      headers: { authorization: req.headers.authorization },
    });
  } catch (err) {
    console.log(err);
    if (err.isAxiosError && err.response.status === 404) {
      return res.status(404).send({ status: 400, message: 'Company Does not exist!' });
    }
  }

  req.body.userId = user;
  const salaryObj = req.body;

  makeRequest('salary.create', salaryObj, (err, resp) => {
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

const updateSalary = async (req, res) => {
  const { user } = req.headers;
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

  let company;
  if (req.body.companyId && req.body.companyId !== null) {
    try {
      company = await axios.get(`${global.gConfig.company_url}/companies/${req.body.companyId}`, {
        headers: { authorization: req.headers.authorization },
      });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 404) {
        return res.status(404).send({ error: 'Company Does not exist!' });
      }
    }
  }

  const salaryObj = req.body;

  makeRequest(
    'salary.update',
    {
      ...salaryObj,
      salaryId: req.params.salaryId,
      id: req.params.id,
      authorization: req.headers.authorization,
    },
    (err, resp) => {
      if (err || !resp) {
        res.status(500).json(errors.serverError);
        return;
      }
      if (company && company.data) {
        resp.company = company.data;
      }

      res.status(201).json(resp);
    }
  );
};

const getSalaries = async (req, res) => {
  try {
    const { limit, offset } = getPagination(req.query.page, req.query.limit);
    const salariesCount = await Salary.count({
      userId: mongoose.Types.ObjectId(String(req.params.id)),
    })
      .skip(offset)
      .limit(limit);

    const salaryList = await Salary.find({
      userId: mongoose.Types.ObjectId(String(req.params.id)),
    })
      .skip(offset)
      .limit(limit);

    return res.status(200).json({ total: salariesCount, nodes: salaryList });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getSalaryById = async (req, res) => {
  const { user } = req.headers;
  if (user !== req.params.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'user.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  try {
    const salary = await Salary.findOne({
      _id: mongoose.Types.ObjectId(String(req.params.salaryId)),
    });
    return res.status(200).send(salary);
  } catch (err) {
    res.status(500).send(errors.serverError);
  }
};

const deleteSalary = async (req, res) => {
  try {
    makeRequest('salary.delete', req.params.salaryId, (err, resp) => {
      if (err || !resp) {
        res.status(500).json(errors.serverError);
        return;
      }
      res.status(201).json(null);
    });
  } catch (err) {
    res.status(500).send(errors.serverError);
  }
};

module.exports = {
  createSalary,
  updateSalary,
  getSalaries,
  deleteSalary,
  getSalaryById,
};
