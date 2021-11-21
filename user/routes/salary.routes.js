const express = require('express');
const router = express.Router({ mergeParams: true });
const { body } = require('express-validator');
const { createSalary, updateSalary, getSalaries, deleteSalary, getSalaryById, generalGetSalaryById, generalGetSalaries } = require('../controller/salary');

/**
 * @typedef Salary
 * @property {string} companyId
 * @property {string} currentlyWorking
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
  body('currentlyWorking').optional().isString(),
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

const [, ...updateSalaryValidators] = salaryBodyValidators();

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
 * @route GET /salaries/
 * @group Salaries
 * @security JWT
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {String} companyId.query
 * @param {String} userId.query
 * @returns {Salary.model} 200 - Get User Salary
 */
router.get('/', generalGetSalaries);

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
router.put('/:salaryId', ...updateSalaryValidators, updateSalary);

/**
 * Delete a User Salaries
 * @route DELETE /users/{id}/salaries/{salaryId}
 * @group User Salaries
 * @security JWT
 * @param {String} id.path.require
 * @param {String} salaryId.path.require
 */
router.delete('/:salaryId', deleteSalary);

module.exports = router;
