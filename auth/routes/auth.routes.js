const express = require('express');
const { getToken, signUp, validateToken } = require('../controller/auth');

const router = express.Router();

/**
 * @typedef AuthReq
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef SignUpReq
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role.required - must be customer/restaurant
 */

/**
 * Get token if valid login credentials
 * @route POST /auth/login
 * @group Auth
 * @param {AuthReq.model} AuthReq.body.required
 * @returns {object} 200 - {token: token}
 */
router.post('/login', getToken);

/**
 * Signup user
 * @route POST /auth/signup
 * @group Auth
 * @param {SignUpReq.model} SignUpReq.body.required
 * @returns {object} 201 - {token: token}
 */
router.post('/signup', signUp);

/**
 * Validate JWT token
 * @route GET /auth/validate
 * @group Auth
 * @param {string} token.query.required
 * @returns {object} 201 - {token: token}
 */
router.get('/validate', validateToken);

module.exports = router;
