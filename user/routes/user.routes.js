const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controller/user');
const { createUserSalary, updateUserSalary } = require('../controller/userSalary');

/**
 * @typedef User
 * @property {string} id
 * @property {string} name
 * @property {string} about
 * @property {string} contactNo
 * @property {[string]} emails
 * @property {[string]} resumes
 * @property {[string]} coverLetters
 * @property {string} city
 * @property {string} state
 * @property {string} country
 * @property {string} zip
 * @property {[string]} jobPreferences
 */

/**
 * @typedef UserSalary
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
 * @property {[string]} benifits
 * @property {string} industry
 */

const bodyValidators = () => [
  body('id').exists().isString(),
  body('name').exists().isString(),
  body('about').optional().isString(),
  body('contactNo').optional().isString(),
  body('emails').optional().isArray(),
  body('resumes').optional().isArray(),
  body('coverLetters').optional().isArray(),
  body('city').optional().isString(),
  body('state').optional().isString(),
  body('country').optional().isString(),
  body('zip').optional().isString(),
  body('jobPreferences').optional().isArray(),
];

const salaryBodyValidators = () => [
  body('companyId').exists().isString(),
  body('currentlyWorking').exists().isString(),
  body('endDate').optional().isString(),
  body('salary').optional().isString(),
  body('title').optional().isArray(),
  body('city').optional().isString(),
  body('state').optional().isString(),
  body('country').optional().isString(),
  body('zip').optional().isString(),
  body('experience').optional().isString(),
  body('benifits').optional().isArray(),
  body('industry').optional().isString(),
];

const [, ...updateValidators] = bodyValidators();
const [, ...updateSalaryValidators] = salaryBodyValidators();

/**
 * Create a User Salary
 * @route POST /users/{id}/salaries
 * @group User Salaries
 * @security JWT
 * @param {String} id.path.require
 * @param {UserSalary.model} UserSalary.body.require
 * @returns {UserSalary.model} 201 - Created User Salary
 */
router.post('/:id/salaries', ...salaryBodyValidators(), createUserSalary);

/**
 * Create a User
 * @route POST /users
 * @group Users
 * @security JWT
 * @param {User.model} User.body.require
 * @returns {User.model} 201 - Created User
 */
router.post('/', ...bodyValidators(), createUser);

/**
 * Get list of Users
 * @route GET /users
 * @param {integer} page.query
 * @param {integer} limit.query
 * @group Users
 * @security JWT
 * @returns {Array.<User>} 200 - List of user info
 */
router.get('/', getAllUsers);

/**
 * Get User by ID
 * @route GET /users/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @returns {user.model} 200 - User for given ID
 */
router.get('/:id', getUserById);

/**
 * Update a User Salary
 * @route PUT /users/{id}/salaries/{salaryId}
 * @group User Salaries
 * @security JWT
 * @param {String} id.path.require
 * @param {String} salaryId.path.require
 * @param {UserSalary.model} UserSalary.body.require
 * @returns {UserSalary.model} 201 - Updated User Salary
 */
router.put('/:id/salaries/:salaryId', ...updateSalaryValidators, updateUserSalary);

/**
 * Update User by ID
 * @route PUT /users/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @param {User.model} User.body.require
 * @returns {User.model} 200 - Updated User
 */
router.put('/:id', ...updateValidators, updateUser);

/**
 * Delete User by ID
 * @route DELETE /users/{id}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @returns {null} 200 - Delete Restaurant
 */
router.delete('/:id', deleteUser);

module.exports = router;
