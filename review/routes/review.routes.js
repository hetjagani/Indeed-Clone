/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/review');

const router = express.Router();

/**
 * @typedef Review
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
  body('userId').isString(),
  body('helpful').optional().isNumeric(),
  body('isFeatured').optional().isBoolean(),
  body('status').optional().isString().isIn(['APPROVED', 'REJECTED', 'PENDING']),
];

/**
 * Get list of reviews
 * @route GET /reviews
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} companyId.query
 * @param {string} userId.query
 * @param {string} sortBy.query
 * @param {string} sortOrder.query
 * @param {boolean} all.query
 * @param {boolean} isFeatured.query
 * @param {boolen} byDate.query
 * @group Review
 * @security JWT
 * @returns {Array.<Review>} 200 - List of review info
 */
router.get('/', getAllReviews);

/**
 * Create a Review
 * @route POST /reviews
 * @group Review
 * @security JWT
 * @param {Review.model} Review.body.require
 * @returns {Review.model} 201 - Created Review
 */
router.post('/', ...bodyValidators(), createReview);

/**
 * Get Review by ID
 * @route GET /reviews/{id}
 * @group Review
 * @security JWT
 * @param {string} id.path.require
 * @param {string} companyId.query
 * @param {string} userId.query
 * @returns {Review.model} 200 - Review for given ID
 */
router.get('/:id', getReviewById);

/**
 * Update Review by ID
 * @route PUT /reviews/{id}
 * @group Review
 * @security JWT
 * @param {string} id.path.require
 * @param {string} companyId.query
 * @param {string} userId.query
 * @param {Review.model} Review.body.require
 * @returns {Review.model} 200 - Updated Review
 */
router.put('/:id', updateReview);

/**
 * Delete Review by ID
 * @route DELETE /reviews/{id}
 * @group Review
 * @security JWT
 * @param {string} id.path.require
 * @param {string} companyId.query
 * @param {string} userId.query
 * @returns {null} 200 - Delete Review
 */
router.delete('/:id', deleteReview);

module.exports = router;
