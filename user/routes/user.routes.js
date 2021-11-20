const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserSalary,
  deleteUserSalary,
} = require('../controller/user');

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

const bodyValidators = () => [
  body('id').exists().isString(),
  body('name').exists().isString(),
  body('about').exists().isString(),
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

const [, ...updateValidators] = bodyValidators();

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

/**
 * GET User salaries by ID
 * @route GET /users/{id}/salaries
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @returns {user.model} 200 - User salary for given ID
 */
 router.get('/:id/salaries', getUserSalary);

 /**
 * Delete User salary by ID
 * @route DELETE /users/{id}/salaries/{salaryId}
 * @group Users
 * @security JWT
 * @param {string} id.path.require
 * @param {number} salaryId.path.require
 * @returns {null} 200 - Delete Restaurant
 */
router.delete('/:id/salaries/:salaryId', deleteUserSalary);


module.exports = router;
