const express = require('express');

const router = express.Router({ mergeParams: true });
const { body } = require('express-validator');
const {
  createSalary,
  updateSalary,
  getSalaries,
  deleteSalary,
  getSalaryById,
} = require('../controller/salary');

/**
 * @typedef Salary
 * @property {string} companyId
 * @property {boolean} currentlyWorking
 * @property {string} endDate
 * @property {integer} salary
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
  body('salary').optional().isNumeric(),
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
 * Get a User Salaries
 * @route GET /users/{id}/salaries
 * @group User Salaries
 * @security JWT
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {String} id.path.require
 * @returns {Salary.model} 200 - Get User Salary
 */
router.get('/', getSalaries);

/**
 * Get a User Salary by Id
 * @route GET /users/{id}/salaries/{salaryId}
 * @group User Salaries
 * @security JWT
 * @param {String} id.path.require
 * @param {String} salaryId.path.require
 * @returns {Salary.model} 200 - Get User Salary
 */
router.get('/:salaryId', getSalaryById);

/**
 * Create a User Salary
 * @route POST /users/{id}/salaries
 * @group User Salaries
 * @security JWT
 * @param {String} id.path.require
 * @param {Salary.model} Salary.body.require
 * @returns {Salary.model} 201 - Created User Salary
 */
router.post('/', ...salaryBodyValidators(), createSalary);

/**
 * Update a User Salary
 * @route PUT /users/{id}/salaries/{salaryId}
 * @group User Salaries
 * @security JWT
 * @param {String} id.path.require
 * @param {String} salaryId.path.require
 * @param {Salary.model} Salary.body.require
 * @returns {Salary.model} 201 - Updated User Salary
 */
router.put('/:salaryId', ...salaryBodyValidators(), updateSalary);

/**
 * Delete a User Salaries
 * @route DELETE /users/{id}/salaries/{salaryId}
 * @group User Salaries
 * @security JWT
 * @param {String} salaryId.path.require
 */
router.delete('/:salaryId', deleteSalary);

module.exports = router;
