/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Employer, Company } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllEmployers = async (req, res) => {
  let { limit, offset } = getPagination(req.query.page, req.query.limit);

  const employersCount = await Employer.count();

  if (req.query.all === 'true') {
    limit = employersCount;
    offset = 0;
  }

  const employerList = await Employer.aggregate([
    {
      $lookup: {
        from: 'companies',
        foreignField: '_id',
        localField: 'companyId',
        as: 'company',
      },
    },
  ])
    .skip(offset)
    .limit(limit);

  res.status(200).json({ total: employersCount, nodes: employerList });
};

const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;

    const employerList = await Employer.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'companies',
          foreignField: '_id',
          localField: 'companyId',
          as: 'company',
        },
      },
    ]);
    if (employerList.length === 0) {
      res.status(404).json(errors.notFound);
      return;
    }
    res.status(200).json(employerList[0]);
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createEmployer = async (req, res) => {
  try {
    const { user } = req.headers;
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

    const employer = req.body;
    employer._id = employer.id;

    // if companyId provided check if the company exists
    if (employer.companyId && employer.companyId != '') {
      const company = await Company.findById(Types.ObjectId(employer.companyId));
      if (!company) {
        res.status(404).json({ status: 404, message: 'company does not exist' });
        return;
      }
    }

    makeRequest('employer.create', employer, async (err, resp) => {
      console.log('IN CREATE EMPLOYER');
      if (err) {
        console.log(err);
        res.status(500).json(errors.serverError);
        return;
      }

      const result = await Employer.aggregate([
        { $match: { _id: Types.ObjectId(resp._id) } },
        {
          $lookup: {
            from: 'companies',
            foreignField: '_id',
            localField: 'companyId',
            as: 'company',
          },
        },
      ]);

      res.status(201).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.serverError);
  }
};

const updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;

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
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const employer = req.body;
    delete employer.companyId;

    const dbEmployer = await Employer.findById(id);
    if (!dbEmployer) {
      res.status(404).json(errors.notFound);
      return;
    }

    makeRequest('employer.update', { id: dbEmployer._id, data: employer }, async (err, resp) => {
      if (err) {
        console.error(err);
        res.status(500).send(errors.serverError);
        return;
      }

      const result = await Employer.aggregate([
        { $match: { _id: Types.ObjectId(resp._id) } },
        {
          $lookup: {
            from: 'companies',
            foreignField: '_id',
            localField: 'companyId',
            as: 'company',
          },
        },
      ]);

      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;

    makeRequest('employer.delete', { id }, (err, resp) => {
      if (err) {
        console.error(err);
        res.status(500).send(errors.serverError);
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
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getAllEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
};
