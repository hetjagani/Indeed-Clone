const { Types } = require('mongoose');
const { getPagination } = require('u-server-utils');
const { Job } = require('../model');

const getAllJobs = async (req, res) => {
  const { compId } = req.params;
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const jobsCount = await Job.count({ companyId: Types.ObjectId(compId) });
  const jobs = await Job.find({ companyId: Types.ObjectId(compId) })
    .skip(offset)
    .limit(limit);

  res.status(200).json({ total: jobsCount, nodes: jobs });
};
const getJobById = async (req, res) => {};
const createJob = async (req, res) => {};
const updateJob = async (req, res) => {};
const deleteJob = async (req, res) => {};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
