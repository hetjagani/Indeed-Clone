/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  topTenCeos,
} = require('../controllers/company');
const { employerCheckMiddleware, employerCheckMiddlewareOnAll } = require('../util/employerCheck');

const jobsRouter = require('./job.route');
const reviewRouter = require('./review.route');
const salaryRouter = require('./salary.route');
const applicationRouter = require('./application.route');
const photoRouter = require('./photo.route');

const router = express.Router();

router.use('/:compId/jobs', employerCheckMiddleware, jobsRouter);
router.use('/:compId/reviews', reviewRouter);
router.use('/:compId/salaries', salaryRouter);
router.use('/:compId/applications', employerCheckMiddlewareOnAll, applicationRouter);
router.use('/:compId/photos', photoRouter);

/**
 * @typedef Company
 * @property {string} name.required
 * @property {object} description.required
 * @property {string} about.required
 * @property {string} workCulture.required
 * @property {string} values.required
 * @property {string} mission.required
 * @property {string} foundedOn.required
 * @property {string} ceo.required
 * @property {object} industry.required
 * @property {string} headquarters.required
 * @property {string} revenue.required
 * @property {integer} size.required
 * @property {string} website.required
 * @property {Array.<object>} media
 * @property {object} logo
 */

const bodyValidators = () => [
  body('name').exists().isString(),
  body('description').isObject(),
  body('about').isString(),
  body('workCulture').isString(),
  body('values').isString(),
  body('mission').isString(),
  body('foundedOn').exists().isString().isDate({ format: 'mm/dd/yyyy' }),
  body('ceo').isString(),
  body('industry').isObject(),
  body('headquarters').isString(),
  body('revenue').isString(),
  body('size').isNumeric(),
  body('website').isString(),
  body('media').optional({ nullable: true }).isArray(),
];

/**
 * Get list of Companies
 * @route GET /companies
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} q.query
 * @param {string} city.query
 * @param {boolean} byReviewed.query
 * @param {boolean} byRatings.query
 * @group Company
 * @security JWT
 * @returns {Array.<Company>} 200 - List of company info
 */
router.get('/', getAllCompanies);

/**
 * Get list of Companies
 * @route GET /companies/topceos
 * @group Company
 * @security JWT
 * @returns {Array.<string>} 200 - List of top ceos of companies
 */
router.get('/topceos', topTenCeos);

/**
 * Create a Company
 * @route POST /companies
 * @group Company
 * @security JWT
 * @param {Company.model} Company.body.require
 * @returns {Company.model} 201 - Created Company
 */
router.post('/', ...bodyValidators(), createCompany);

/**
 * Get Company by ID
 * @route GET /companies/{id}
 * @group Company
 * @security JWT
 * @param {string} id.path.require
 * @returns {Company.model} 200 - Company for given ID
 */
router.get('/:id', getCompanyById);

/**
 * Update Company by ID
 * @route PUT /companies/{id}
 * @group Company
 * @security JWT
 * @param {string} id.path.require
 * @param {Company.model} Company.body.require
 * @returns {Company.model} 200 - Updated Company
 */
router.put('/:id', ...bodyValidators(), updateCompany);

/**
 * Delete Company by ID
 * @route DELETE /companies/{id}
 * @group Company
 * @security JWT
 * @param {string} id.path.require
 * @returns {null} 200 - Delete Company
 */
router.delete('/:id', deleteCompany);

module.exports = router;
