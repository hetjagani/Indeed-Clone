const express = require('express');

const { createChat, getChatById, getAllChats } = require('../controller/chat');

const { body } = require('express-validator');

const router = express.Router({ mergeParams: true });

const messageRouter = require('./message.routes');
router.use('/:id/messages', messageRouter);

const bodyValidators = () => [
  body('subject').exists().isString(),
  body('userId').exists().isString(),
];

/**
 * @typedef Chat
 * @property {string} userId.required
 * @property {string} subject.required
 */

/**
 * Get a Chat by Id
 * @route GET /chats/{id}
 * @group Chat
 * @security JWT
 * @param {string} id.path.required
 * @returns {Chat.model} 200 - Returns Chat Object
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/:id', getChatById);

/**
 * Get Paginated results of Photos(page, limit)
 * @route GET /chats/
 * @group Chat
 * @param {string} page.query
 * @param {string} limit.query
 * @security JWT
 * @returns {array} 200 - [Array of Chat Objects based on Query Params]
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/', getAllChats);

/**
 * Create Chat
 * @route POST /chats/
 * @group Chat
 * @param {Chat.model} Chat.body.required
 * @security JWT
 * @returns {Chat.model} 201 - New Chat
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.post('/', ...bodyValidators(), createChat);

module.exports = router;
