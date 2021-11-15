const { getPagination } = require('u-server-utils');
const { Employer } = require('../model');

const getAllEmployers = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const employersCount = await Employer.count().skip(offset).limit(limit);

  const employerList = await Employer.find({}).skip(offset).limit(limit);

  res.status(200).json({ total: employersCount, nodes: employerList });
};

const getEmployerById = async (req, res) => {};

const createEmployer = async (req, res) => {};

const updateEmployer = async (req, res) => {};

const deleteEmployer = async (req, res) => {};

module.exports = {
  getAllEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
};
