const express = require('express');

const router = express.Router({ mergeParams: true });
const { body } = require('express-validator');
const { generalGetSalaryById, generalGetSalaries } = require('../controller/salary');

/**
 * @typedef Salary
 * @property {string} companyId
 * @property {boolean} currentlyWorking
 * @property {string} endDate
 * @property {string} salary
 * @property {string} title
 * @property {string} city
 * @property {string} state
 * @property {string} country
 * @property {string} zip
 * @property {string} experience
 * @property {Array.<string>} benifits
 * @property {object} industry
 */

const salaryBodyValidators = () => [
  body('companyId').exists().isString(),
  body('currentlyWorking').optional().isBoolean(),
  body('endDate').optional().isString(),
  body('salary').optional().isString(),
  body('title').optional().isString(),
  body('city').optional().isString(),
  body('state').optional().isString(),
  body('country').optional().isString(),
  body('zip').optional().isString(),
  body('experience').optional().isString(),
  body('benifits').optional().isArray(),
  body('industry').optional().isObject(),
];

/**
 * Get a User Salary by Id
 * @route GET /salaries/{id}
 * @security JWT
 * @group Salaries
 * @param {String} id.path.require
 * @returns {Salary.model} 200 - Get User Salary (General)
 */
router.get('/:id', generalGetSalaryById);

/**
 * Get a User Salaries (General)
 * @route GET /salaries
 * @group Salaries
 * @security JWT
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {String} companyId.query
 * @param {String} userId.query
 * @param {String} title.query
 * @param {String} city.query
 * @param {String} state.query
 * @param {String} company.query
 * @param {boolean} all.query
 * @returns {Salary.model} 200 - Get User Salary
 */
router.get('/', generalGetSalaries);

module.exports = router;
