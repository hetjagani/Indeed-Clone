const express = require('express');

const router = express.Router({ mergeParams: true });
const { getCompanySalaries, getCompanySalaryById } = require('../controllers/salary');

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

/**
 * Get a Company Salaries (General)
 * @route GET /companies/{compId}/salaries/{id}
 * @group Salaries
 * @security JWT
 * @param {String} compId.path.query
 * @param {String} id.path.query
 * @returns {Salary.model} 200 - Get User Salary
 */
router.get('/:id', getCompanySalaryById);

/**
 * Get a Company Salary by Id
 * @route GET /companies/{compId}/salaries
 * @security JWT
 * @group Salaries
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {String} compId.path.require
 * @returns {Salary.model} 200 - Get User Salary (General)
 */
router.get('/', getCompanySalaries);

module.exports = router;
