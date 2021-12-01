const express = require('express');
const { body } = require('express-validator');
const {
  getUserReviewById,
  getUserReviews,
  createUserReview,
  deleteUserReview,
  updateUserReview,
} = require('../controller/review');

const router = express.Router({ mergeParams: true });

/**
 * @typedef ReviewBody
 * @property {integer} overallRating.required
 * @property {integer} workLifeBalance.required
 * @property {integer} compensation.required
 * @property {integer} jobSecurity.required
 * @property {integer} management.required
 * @property {integer} jobCulture.required
 * @property {string} summary.required
 * @property {string} review.required
 * @property {string} pros.required
 * @property {string} cons.required
 * @property {boolean} ceoApproval.required
 * @property {string} tips.required
 * @property {string} companyId.required
 * @property {string} reviewDate.required
 * @property {integer} helpful.required
 */

/**
 * @typedef ReviewResponse
 * @property {integer} overallRating.required
 * @property {integer} workLifeBalance.required
 * @property {integer} compensation.required
 * @property {integer} jobSecurity.required
 * @property {integer} management.required
 * @property {integer} jobCulture.required
 * @property {string} summary.required
 * @property {string} review.required
 * @property {string} pros.required
 * @property {string} cons.required
 * @property {boolean} ceoApproval.required
 * @property {string} tips.required
 * @property {string} companyId.required
 * @property {string} userId.required
 * @property {boolean} isFeatured.required
 * @property {string} status.required
 * @property {string} reviewDate.required
 * @property {integer} helpful.required
 */

const bodyValidators = () => [
  body('overallRating').exists().isNumeric(),
  body('workLifeBalance').exists().isNumeric(),
  body('compensation').exists().isNumeric(),
  body('jobSecurity').exists().isNumeric(),
  body('management').exists().isNumeric(),
  body('jobCulture').exists().isNumeric(),
  body('summary').isString(),
  body('review').isString(),
  body('pros').isString(),
  body('cons').isString(),
  body('ceoApproval').isBoolean(),
  body('reviewDate').exists().isString().isDate({ format: 'mm/dd/yyyy' }),
  body('tips').isString(),
  body('companyId').isString(),
  body('helpful').isNumeric(),
];

/**
 * Get a User Reviews
 * @route GET /users/{id}/reviews
 * @group Reviews
 * @security JWT
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} sortBy.query
 * @param {string} sortOrder.query
 * @param {boolean} isFeatured.query
 * @param {string} id.path.require
 * @returns {ReviewResponse.model} 200 - Get User Reviews
 */
router.get('/', getUserReviews);

/**
 * Get a User Review by Id
 * @route GET /users/{id}/reviews/{reviewId}
 * @group Reviews
 * @security JWT
 * @param {String} id.path.require
 * @param {String} reviewId.path.require
 * @returns {ReviewResponse.model} 200 - Get User Reviews by Id
 */
router.get('/:reviewId', getUserReviewById);

/**
 * Create a User Review
 * @route POST /users/{id}/reviews
 * @group Reviews
 * @security JWT
 * @param {String} id.path.require
 * @param {ReviewBody.model} ReviewBody.body.require
 * @returns {ReviewResponse.model} 201 - Created User Review
 */
router.post('/', ...bodyValidators(), createUserReview);

/**
 * Update User Review by ID
 * @route PUT /users/{id}/reviews/{reviewId}
 * @group Reviews
 * @security JWT
 * @param {string} id.path.require
 * @param {String} reviewId.path.require
 * @param {ReviewBody.model} ReviewBody.body.require
 * @returns {ReviewResponse.model} 200 - Updated User Review
 */
router.put('/:reviewId', ...bodyValidators(), updateUserReview);

/**
 * Delete a User Review
 * @route DELETE /users/{id}/reviews/{reviewId}
 * @group Reviews
 * @security JWT
 * @param {String} id.path.require
 * @param {String} reviewId.path.require
 */
router.delete('/:reviewId', deleteUserReview);

module.exports = router;
