const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const {
  getUserPhotoById,
  getUserPhotos,
  createUserPhoto,
  deleteUserPhoto,
  updateUserPhoto,
} = require('../controller/photo');

const upload = multer({ dest: '/tmp' });

const router = express.Router({ mergeParams: true });

/**
 * @typedef Photo
 * @property {string} userId
 * @property {string} companyId
 * @property {string} isFeatured
 * @property {string} status
 * @property {string} imageData
 */

const bodyValidators = () => [
  body('companyId').exists().isString(),
  body('isFeatured').optional().isBoolean(),
];

const updateValidators = () => [body('isFeatured').exists().isBoolean()];

/**
 * Get a User Photos
 * @route GET /users/{id}/photos
 * @group Photos
 * @security JWT
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {boolean} isFeatured.query
 * @param {String} id.path.require
 * @returns {Photo.model} 200 - Get User Photos
 */
router.get('/', getUserPhotos);

/**
 * Get a User Photo by Id
 * @route GET /users/{id}/photos/{photoId}
 * @group Photos
 * @security JWT
 * @param {String} id.path.require
 * @param {String} photoId.path.require
 * @returns {Photo.model} 200 - Get User Photo
 */
router.get('/:photoId', getUserPhotoById);

/**
 * Create a User Photo
 * @route POST /users/{id}/photos
 * @group Photos
 * @security JWT
 * @param {String} id.path.require
 * @param {Photo.model} Photo.body.require
 * @returns {Photo.model} 201 - Created User Photo
 */
router.post('/', ...bodyValidators(), upload.single('imageData'), createUserPhoto);

/**
 * Update User Photo by ID
 * @route PUT /users/{id}/photos/{photoId}
 * @group Photos
 * @security JWT
 * @param {string} id.path.require
 * @param {String} photoId.path.require
 * @param {Photo.model} Photo.body.require
 * @returns {Photo.model} 200 - Updated Photo
 */
router.put('/:photoId', ...updateValidators(), updateUserPhoto);

/**
 * Delete a User Photo
 * @route DELETE /users/{id}/photos/{photoId}
 * @group Photos
 * @security JWT
 * @param {String} photoId.path.require
 * @param {String} id.path.require
 */
router.delete('/:photoId', deleteUserPhoto);

module.exports = router;
