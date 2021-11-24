/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const {
  getUserApplications,
  createUserApplication,
  getUserApplicationById,
} = require('../controller/application');

const router = express.Router({ mergeParams: true });

/**
 * @typedef Application
 * @property {string} jobId.required
 * @property {string} resume.required
 * @property {string} coverLetter.required
 * @property {object} answers.required
 */

const bodyValidators = () => [
  body('jobId').exists().isString(),
  body('resume').exists().isString(),
  body('coverLetter').exists().isString(),
  body('answers').isObject(),
];

/**
 * Get list of User Applications
 * @route GET /users/{id}/applications/
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {strint} jobIds.query
 * @param {string} id.path.require
 * @group Application
 * @security JWT
 * @returns {Array.<Application>} 200 - List of User applications info
 */
router.get('/', getUserApplications);

/**
 * Create a User Application
 * @route POST /users/{id}/applications
 * @group Application
 * @security JWT
 * @param {string} id.path.require
 * @param {Application.model} Application.body.require
 * @returns {Application.model} 201 - Created Application for User
 */
router.post('/', ...bodyValidators(), createUserApplication);

/**
 * Get User Application by ID
 * @route GET /users/{id}/applications/{applicationId}
 * @group Application
 * @security JWT
 * @param {string} id.path.require
 * @param {string} applicationId.path.require
 * @returns {Application.model} 200 - Application for given ID
 */
router.get('/:applicationId', getUserApplicationById);

module.exports = router;
