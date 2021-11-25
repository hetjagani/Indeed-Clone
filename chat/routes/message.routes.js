const express = require('express');

const { body } = require('express-validator');

const {
  createMessage,
  getMessageById,
  getAllMessages,
} = require('../controller/message');

const router = express.Router({ mergeParams: true });

const bodyValidators = () => [
  body('to').exists().isString(),
  body('content').exists().isString(),
];

/**
 * @typedef Message
 * @property {string} to.required
 * @property {string} content.required
 */

/**
 * Create Message
 * @route POST /chats/{id}/messages/
 * @group Message
 * @param {string} id.path.required
 * @param {Message.model} Message.body.required
 * @security JWT
 * @returns {Message.model} 201 - Message.model
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.post('/', ...bodyValidators(), createMessage);

/**
 * Get a Message by Id
 * @route GET /chats/{id}/messages/{messageId}
 * @group Message
 * @param {string} id.path.required
 * @param {string} messageId.path.required
 * @security JWT
 * @returns {Message.model} 200 - Returns Photo Object
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/:messageId', getMessageById);

/**
 * Get Paginated Result of Message(page, limit, employeeId, userId)
 * @route GET /chats/{id}/messages
 * @group Message
 * @param {string} page.query.required
 * @param {string} limit.query.required
 * @param {string} id.path.required
 * @security JWT
 * @returns {array} 200 - [Array of Message Objects based on Query Params]
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/', getAllMessages);

module.exports = router;
