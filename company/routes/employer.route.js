/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const {
  getAllEmployers,
  createEmployer,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
} = require('../controllers/employer');

const router = express.Router();

/**
 * @typedef Employer
 * @property {string} id.required
 * @property {string} name.required
 * @property {string} role.required
 * @property {string} address.required
 * @property {string} dateOfBirth.required
 * @property {string} companyId
 * @property {object} medium
 */

const bodyValidators = () => [
  body('id').exists().isString(),
  body('name').exists().isString(),
  body('role').isString(),
  body('address').exists().isString(),
  body('dateOfBirth').exists().isString().isDate({ format: 'mm/dd/yyyy' }),
  body('companyId').optional({ nullable: true }).isString(),
];

const [, ...updateValidators] = bodyValidators();

/**
 * Get list of Employers
 * @route GET /employers
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} all.query
 * @group Employer
 * @security JWT
 * @returns {Array.<Employer>} 200 - List of employer info
 */
router.get('/', getAllEmployers);

/**
 * Create a Employer
 * @route POST /employers
 * @group Employer
 * @security JWT
 * @param {Employer.model} Employer.body.require
 * @returns {Employer.model} 201 - Created Employer with company info
 */
router.post('/', ...bodyValidators(), createEmployer);

/**
 * Get Employer by ID
 * @route GET /employers/{id}
 * @group Employer
 * @security JWT
 * @param {string} id.path.require
 * @returns {Employer.model} 200 - Employer for given ID
 */
router.get('/:id', getEmployerById);

/**
 * Update Employer by ID
 * @route PUT /employers/{id}
 * @group Employer
 * @security JWT
 * @param {string} id.path.require
 * @param {Employer.model} Employer.body.require
 * @returns {Employer.model} 200 - Updated Employer
 */
router.put('/:id', ...updateValidators, updateEmployer);

/**
 * Delete Employer by ID
 * @route DELETE /employers/{id}
 * @group Employer
 * @security JWT
 * @param {string} id.path.require
 * @returns {null} 200 - Delete Employer
 */
router.delete('/:id', deleteEmployer);

module.exports = router;
