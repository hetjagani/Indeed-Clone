const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination, errors } = require('u-server-utils');
const { Company } = require('../model');
const { makeRequest } = require('../util/kafka/client');

const getAllCompanies = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const companyCount = await Company.count().skip(offset).limit(limit);

  const companyList = await Company.aggregate([
    {
      $lookup: {
        from: 'employers',
        localField: 'employers',
        foreignField: '_id',
        as: 'employers',
      },
    },
  ])
    .skip(offset)
    .limit(limit);

  res.status(200).json({ total: companyCount, nodes: companyList });
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;

  const companyList = await Company.aggregate([
    { $match: { _id: Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'employers',
        localField: 'employers',
        foreignField: '_id',
        as: 'employers',
      },
    },
  ]);

  if (companyList.length === 0) {
    res.status(404).json(errors.notFound);
    return;
  }

  res.status(200).json(companyList[0]);
};

const createCompany = async (req, res) => {
  const { user } = req.headers;

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const company = req.body;
  company.employers = [user];

  makeRequest('company.create', { company, user }, async (err, resp) => {
    if (err) {
      res.status(500).json(errors.serverError);
      return;
    }

    const { _id } = resp;

    const companyList = await Company.aggregate([
      { $match: { _id: Types.ObjectId(_id) } },
      {
        $lookup: {
          from: 'employers',
          localField: 'employers',
          foreignField: '_id',
          as: 'employers',
        },
      },
    ]);

    res.status(201).json(companyList[0]);
  });
};

const updateCompany = async (req, res) => {};
const deleteCompany = async (req, res) => {};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
