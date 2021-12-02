const express = require('express');
const { body } = require('express-validator');
const {
  getCompanyPhotos,
  getCompanyPhotoById,
  updateCompanyPhoto,
} = require('../controllers/photo');
const { employerCheckMiddleware } = require('../util/employerCheck');

const router = express.Router({ mergeParams: true });

/**
 * @typedef Photo
 * @property {boolean} isFeatured.required
 */

const bodyValidators = () => [body('isFeatured').exists().isBoolean()];

/**
 * Get list of Company Photos
 * @route GET /companies/{compId}/photos
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} compId.path
 * @param {boolean} isFeatured.query
 * @group Photos
 * @security JWT
 * @returns {Array.<Photo>} 200 - List of photo info
 */
router.get('/', getCompanyPhotos);

/**
 * Get Company Photo by ID
 * @route GET /companies/{compId}/photos/{photoId}
 * @param {string} compId.path
 * @param {string} photoId.path
 * @group Photos
 * @security JWT
 * @returns {Photo.model} 200 - Photo for given ID
 */
router.get('/:photoId', getCompanyPhotoById);

/**
 * Update Company Photo by ID
 * @route PUT /companies/{compId}/photos/{photoId}
 * @param {string} compId.path
 * @param {string} photoId.path
 * @group Photos
 * @security JWT
 * @param {Photo.model} Photo.body.require
 * @returns {Photo.model} 200 - Updated Photo
 */
router.put('/:photoId', ...bodyValidators(), employerCheckMiddleware, updateCompanyPhoto);

module.exports = router;
