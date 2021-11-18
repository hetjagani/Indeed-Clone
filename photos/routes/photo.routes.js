const express = require('express');
const multer = require('multer');

const upload = multer({ dest: '/temp' });

const {
  addPhoto,
  getPhotoById,
  getAllPhotos,
  deletePhoto,
  updatePhoto,
} = require('../controller/photo');

const router = express.Router();

/**
 * @typedef AddPhoto
 * @property {string} imageData.required
 * @property {boolean} isFeatured.required
 * @property {string} userId.required
 * @property {string} companyId.required
 */

/**
 * Add photo
 * @route POST /photos/
 * @group Photo
 * @param {AddPhoto.model} AddPhoto.body.required
 * @returns {object} 201 - {url: newUrl of the Photo uploaded}
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.post('/', upload.single('imageData'), addPhoto);

/**
 * Get a Photo by Id
 * @route GET /photos/{id}
 * @group Photo
 * @param {string} id.path.required
 * @returns {object} 200 - Returns Photo Object
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/:id', getPhotoById);

/**
 * Get Paginated results of Photos(page, limit, userId, companyId)
 * @route GET /photos/
 * @group Photo
 * @param {string} page.query.required
 * @param {string} limit.query.required
 * @param {string} userId.query.required
 * @param {string} companyId.query.required
 * @returns {array} 200 - [Array of Photo Objects based on Query Params]
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/', getAllPhotos);

/**
 * @typedef UpdatePhoto
 * @property {boolean} isFeatured.required
 * @property {string} altText.required
 */

/**
 * Add photo
 * @route PUT /photos/{id}
 * @group Photo
 * @param {string} id.path.required
 * @param {UpdatePhoto.model} UpdatePhoto.body.required
 * @returns {object} 200 - {message: Photo Image Successfully}
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.put('/:id', updatePhoto);

/**
 * @route DELETE /photos/{id}
 * @group Photo
 * @param {string} id.path.required
 * @returns {object} 200 - {message: Deleted successfully}
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.delete('/:id', deletePhoto);

module.exports = router;
