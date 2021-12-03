const express = require('express');
const { body } = require('express-validator');
const {
  getCompanyApplications,
  getCompanyApplicationById,
  updateCompanyApplication,
} = require('../controllers/application');

const router = express.Router({ mergeParams: true });

/**
 * @typedef ApplicationBody
 * @property {string} status.required
 */

const bodyValidators = () => [
  // body('status').exists().isString().isIn('RECEIVED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'),
];

/**
 * Get list of Company Applications
 * @route GET /companies/{compId}/applications
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} compId.path
 * @group Applications
 * @security JWT
 * @returns {Array.<ApplicationBody>} 200 - List of application info
 */
router.get('/', getCompanyApplications);

/**
 * Get Company Application by ID
 * @route GET /companies/{compId}/applications/{appId}
 * @param {string} compId.path
 * @param {string} appId.path
 * @group Applications
 * @security JWT
 * @returns {ApplicationBody.model} 200 - Application for given ID
 */
router.get('/:appId', getCompanyApplicationById);

/**
 * Update Company Application by ID
 * @route PUT /companies/{compId}/applications/{appId}
 * @param {string} compId.path
 * @param {string} appId.path
 * @group Applications
 * @security JWT
 * @param {ApplicationBody.model} ApplicationBody.body.require
 * @returns {ApplicationBody.model} 200 - Updated Application
 */
router.put('/:appId', ...bodyValidators(), updateCompanyApplication);

module.exports = router;
