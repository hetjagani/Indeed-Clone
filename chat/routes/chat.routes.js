const express = require('express');

const { createChat, getChatById, getAllChats } = require('../controller/chat');

const router = express.Router();

/**
 * @typedef Chat
 * @property {string} _id.required
 * @property {string} employerId.required
 * @property {string} userId.required
 * @property {string} subject.required
 */

/**
 * Create Chat
 * @route POST /chats/
 * @group Chat
 * @param {Chat.model} Chat.body.required
 * @returns {Chat.model} 201 - New Chat
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.post('/', createChat);

/**
 * Get a Chat by Id
 * @route GET /chats/{id}
 * @group Chat
 * @param {string} id.path.required
 * @returns {Chat.model} 200 - Returns Chat Object
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/:id', getChatById);

/**
 * Get Paginated results of Photos(page, limit, userId, companyId)
 * @route GET /chats/
 * @group Chat
 * @param {string} page.query.required
 * @param {string} limit.query.required
 * @param {string} employerId.query.required
 * @param {string} userId.query.required
 * @returns {array} 200 - [Array of Chat Objects based on Query Params]
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/', getAllChats);

module.exports = router;
