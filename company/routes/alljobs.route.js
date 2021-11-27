const express = require('express');
const { getJobsList, getJobInfoById } = require('../controllers/job');

const router = express.Router({ mergeParams: true });

/**
 * Get list of Jobs filtered
 * @route GET /jobs
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} city.query
 * @param {string} state.query
 * @param {string} location.query
 * @param {string} companyId.query
 * @param {string} q.query
 * @param {boolean} all.query
 * @param {string} type.query
 * @param {string} industry.query
 * @param {string} since.query  (format: yyyy-mm-dd)
 * @group Job
 * @security JWT
 * @returns {Array.<Job>} 200 - List of jobs info
 */
router.get('/', getJobsList);

/**
 * Get Job Detail by ID
 * @route GET /jobs/{id}
 * @param {string} id.path
 * @group Job
 * @security JWT
 * @returns {Job.model} 200 - Job for given ID
 */
router.get('/:id', getJobInfoById);

module.exports = router;
