const express = require('express');
const multer = require('multer');
const { createMedia } = require('../controllers/media');

const upload = multer({ dest: '/tmp' });

const router = express.Router();

/**
 * @typedef Media
 * @property {string} url
 */

/**
 * Create a Media
 * @route POST /media
 * @group Media
 * @security JWT
 * @param {Media.model} Media.body.require
 * @returns {Media.model} 201 - Created User Media
 */
router.post('/', upload.single('imageData'), createMedia);

module.exports = router;
