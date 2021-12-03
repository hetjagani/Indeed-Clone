/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const { getAllJobs, createJob, getJobById, updateJob, deleteJob } = require('../controllers/job');

const router = express.Router({ mergeParams: true });

/**
 * @typedef Job
 * @property {string} title.required
 * @property {object} industry.required
 * @property {string} city.required
 * @property {string} state.required
 * @property {string} country.required
 * @property {string} address.required
 * @property {string} jobLocation.required
 * @property {string} type.required
 * @property {integer} zipcode.required
 * @property {string} postedOn.required
 * @property {integer} salary.required
 * @property {object} description.required
 * @property {Array.<string>} summary
 * @property {boolean} isFeatured.required
 * @property {Array.<string>} questions
 */

const bodyValidators = () => [
  body('title').exists().isString(),
  body('industry').exists().isObject(),
  body('city').exists().isString(),
  body('state').exists().isString(),
  body('country').exists().isString(),
  body('address').exists().isString(),
  body('jobLocation').exists().isString().isIn(['remote', 'in_person']),
  body('type').exists().isString().isIn(['internship', 'full_time', 'contract']),
  body('zipcode').exists().isNumeric(),
  body('postedOn').exists().isDate({ format: 'mm/dd/yyyy' }),
  body('salary').exists().isNumeric(),
  body('description').exists().isObject(),
  body('isFeatured').exists().isBoolean(),
  body('questions').exists().isArray(),
  body('summary').isArray(),
];

/**
 * Get list of Jobs
 * @route GET /companies/{compId}/jobs
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} since.query
 * @param {string} compId.path
 * @group Job
 * @security JWT
 * @returns {Array.<Job>} 200 - List of jobs info
 */
router.get('/', getAllJobs);

/**
 * Create a Job
 * @route POST /companies/{compId}/jobs
 * @param {string} compId.path
 * @group Job
 * @security JWT
 * @param {Job.model} Job.body.require
 * @returns {Job.model} 201 - Created Job
 */
router.post('/', ...bodyValidators(), createJob);

/**
 * Get Job by ID
 * @route GET /companies/{compId}/jobs/{id}
 * @param {string} compId.path
 * @param {string} id.path
 * @group Job
 * @security JWT
 * @returns {Job.model} 200 - Job for given ID
 */
router.get('/:id', getJobById);

/**
 * Update Job by ID
 * @route PUT /companies/{compId}/jobs/{id}
 * @param {string} compId.path
 * @param {string} id.path
 * @group Job
 * @security JWT
 * @param {Job.model} Job.body.require
 * @returns {Job.model} 200 - Updated Job
 */
router.put('/:id', ...bodyValidators(), updateJob);

/**
 * Delete Job by ID
 * @route DELETE /companies/{compId}/jobs/{id}
 * @param {string} compId.path
 * @param {string} id.path
 * @group Job
 * @security JWT
 * @param {string} id.path.require
 * @returns {null} 200 - Delete Job
 */
router.delete('/:id', deleteJob);

module.exports = router;
