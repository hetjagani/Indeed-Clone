const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createUser } = require('../controllers/user');

/**
 * @typedef User
 * @property {string} id.required
 * @property {string} name.required
 * @property {string} about.required
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

/**
 * Create a User
 * @route POST /users
 * @group Users
 * @security JWT
 * @param {User.model} User.body.require
 * @returns {User.model} 201 - Created User
 */
router.post('/', ...bodyValidators(), createUser);

module.exports = router