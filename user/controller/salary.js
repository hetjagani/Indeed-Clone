/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const { errors, getPagination } = require('u-server-utils');
const mongoose = require('mongoose');
const { default: axios } = require('axios');
const { ObjectId } = require('mongodb');
const { makeRequest } = require('../util/kafka/client');
const { Salary } = require('../model');

const getCompanies = async (auth) => {
  const resp = await axios.get(`${global.gConfig.company_url}/companies`, {
    headers: { Authorization: auth },
    params: { all: true },
  });

  const companiesMap = {};

  resp.data.forEach((comp) => {
    companiesMap[comp._id] = comp;
  });

  return companiesMap;
};

const createSalary = async (req, res) => {
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

  if (req.body.companyId === null || req.body.companyId === undefined) {
    return res.status(404).send({ status: 400, message: 'Company Id Not Found' });
  }

  let company;
  try {
    company = await axios.get(`${global.gConfig.company_url}/companies/${req.body.companyId}`, {
      headers: { authorization: req.headers.authorization },
    });
  } catch (err) {
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
      console.log(err);
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
      res.status(200).json(resp);
    },
  );
};

const getSalaries = async (req, res) => {
  try {
    const { limit, offset } = getPagination(req.query.page, req.query.limit);
    const salariesCount = await Salary.count({
      userId: mongoose.Types.ObjectId(String(req.params.id)),
    });

    const salaryList = await Salary.find({
      userId: mongoose.Types.ObjectId(String(req.params.id)),
    })
      .skip(offset)
      .limit(limit);

    return res.status(200).json({ total: salariesCount, nodes: salaryList });
  } catch (err) {
    res.status(500).send(errors.serverError);
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
      res.status(200).json(null);
    });
  } catch (err) {
    res.status(500).send(errors.serverError);
  }
};

const generalGetSalaryById = async (req, res) => {
  try {
    const { companyId, userId } = req.query;

    const searchObj = { _id: ObjectId(req.params.id) };
    if (companyId && companyId !== '') {
      searchObj.companyId = companyId;
    }

    if (req.query.userId && req.query.userId !== '') {
      searchObj.userId = userId;
    }

    const salary = await Salary.findOne(searchObj);
    return res.status(200).send(salary);
  } catch (err) {
    res.status(500).send(errors.serverError);
  }
};

const generalGetSalaries = async (req, res) => {
  try {
    const { limit, offset } = getPagination(req.query.page, req.query.limit);
    const { companyId, userId, city, state, company, title, all } = req.query;

    const searchObj = {};
    if (companyId && companyId !== '') {
      searchObj.companyId = mongoose.Types.ObjectId(String(companyId));
    }

    if (userId && userId !== '') {
      searchObj.userId = mongoose.Types.ObjectId(String(userId));
    }

    if (city && city !== '') {
      searchObj.city = city;
    }

    if (state && state !== '') {
      searchObj.state = state;
    }

    if (title && title !== '') {
      searchObj.title = { $regex: `(?i)${title}` };
    }

    if (all && all == 'true') {
      const salaryList = await Salary.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
      ]);
      res.status(200).json(salaryList);
      return;
    }

    const salaryList = await Salary.aggregate([
      {
        $match: searchObj,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ])
      .skip(offset)
      .limit(limit);

    const result = {
      total: salaryList.length,
    };

    const companiesMap = await getCompanies(req.headers.authorization);

    const salaryListWithCompany = salaryList.map((s) => {
      return {
        ...s,
        company: companiesMap[s.companyId.toString()],
      };
    });

    if (company && company !== '') {
      const filteredSalaries = salaryListWithCompany.filter((s) => {
        if (s.company?.name?.toLowerCase().includes(company.toLowerCase())) {
          return s;
        }
      });

      result.nodes = filteredSalaries.slice(offset, limit + offset);
      result.nodes = result.nodes.sort((a, b) => b.salary - a.salary);

      res.status(200).json(result);
      return;
    }

    result.nodes = salaryListWithCompany.slice(offset, limit + offset);
    result.nodes = result.nodes.sort((a, b) => b.salary - a.salary);
    res.status(200).json(result);
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
  createSalary,
  updateSalary,
  getSalaries,
  deleteSalary,
  getSalaryById,
  generalGetSalaryById,
  generalGetSalaries,
};
