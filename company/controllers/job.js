/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Job, Company } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllJobs = async (req, res) => {
  const { compId } = req.params;
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  try {
    const jobsCount = await Job.count({ companyId: Types.ObjectId(compId) });
    const result = await Job.aggregate([
      { $match: { companyId: Types.ObjectId(compId) } },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
    ])
      .skip(offset)
      .limit(limit);

    res.status(200).json({ total: jobsCount, nodes: result });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getJobById = async (req, res) => {
  const { compId, id } = req.params;

  try {
    const result = await Job.aggregate([
      { $match: { _id: Types.ObjectId(id), companyId: Types.ObjectId(compId) } },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
    ]);
    if (result?.length === 0) {
      res.status(404).json(errors.notFound);
      return;
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createJob = async (req, res) => {
  const { compId } = req.params;

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const job = req.body;
  job.companyId = compId;

  makeRequest('job.create', job, async (err, resp) => {
    if (err) {
      console.log(err);
      res.status(500).json(errors.serverError);
      return;
    }
    const company = await Company.findById(Types.ObjectId(resp.companyId));

    const result = { ...resp, company };
    res.status(201).json(result);
  });
};

const updateJob = async (req, res) => {
  const { compId, id } = req.params;

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const job = req.body;

  try {
    const dbJob = await Job.findOne({
      _id: Types.ObjectId(id),
      companyId: Types.ObjectId(compId),
    });
    if (!dbJob) {
      res.status(404).json(errors.notFound);
      return;
    }

    makeRequest('job.update', { data: job, id: dbJob._id }, async (err, resp) => {
      if (err) {
        console.log(err);
        res.status(500).json(errors.serverError);
        return;
      }
      const result = await Job.aggregate([
        { $match: { _id: Types.ObjectId(resp._id) } },
        {
          $lookup: {
            from: 'companies',
            localField: 'companyId',
            foreignField: '_id',
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

const deleteJob = async (req, res) => {
  const { compId, id } = req.params;

  try {
    const dbJob = await Job.findOne({
      _id: Types.ObjectId(id),
      companyId: Types.ObjectId(compId),
    });
    if (!dbJob) {
      res.status(404).json(errors.notFound);
      return;
    }

    makeRequest('job.delete', { id: dbJob._id }, async (err, resp) => {
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
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getJobsList = async (req, res) => {
  const whereOpts = [];
  const { city, state, q, companyId, location } = req.query;

  if (city && city !== '') {
    whereOpts.push({ city });
  }

  if (state && state !== '') {
    whereOpts.push({ state });
  }

  if (location && location !== '') {
    whereOpts.push({ jobLocation: location });
  }

  if (companyId && companyId !== '') {
    whereOpts.push({ companyId: Types.ObjectId(companyId) });
  }

  if (q && q !== '') {
    whereOpts.push({ title: { $regex: q } });
  }

  const query = {};
  if (whereOpts.length > 0) {
    query.$and = whereOpts;
  }

  try {
    const { limit, offset } = getPagination(req.query.page, req.query.limit);
    const jobsCnt = await Job.count(query);
    const result = await Job.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
    ])
      .skip(offset)
      .limit(limit);

    res.status(200).json({ total: jobsCnt, nodes: result });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.status(400).json(errors.badRequest);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getJobInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(Types.ObjectId(id));
    if (!job) {
      res.status(404).json(errors.notFound);
      return;
    }

    res.status(200).json(job);
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
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsList,
  getJobInfoById,
};
