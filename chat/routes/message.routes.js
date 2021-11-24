const express = require('express');

const {
  createMessage,
  getMessageById,
  getAllMessages,
} = require('../controller/message');

const router = express.Router({ mergeParams: true });

/**
 * @typedef Message
 * @property {string} _id.required
 * @property {string} to.required
 * @property {string} from.required
 * @property {string} content.required
 */

/**
 * Create Message
 * @route POST /chats/{id}/messages/
 * @group Message
 * @param {Message.model} Message.body.required
 * @returns {Message.model} 201 - Message.model
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.post('/', createMessage);

/**
 * Get a Message by Id
 * @route GET /chats/{id}/messages/{messageId}
 * @group Message
 * @param {string} id.path.required
 * @param {string} mesaageId.path.required
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
 * @param {string} employeeId.query.required
 * @param {string} userId.query.required
 * @returns {array} 200 - [Array of Message Objects based on Query Params]
 * @returns {Error} 500 - {error: Internal Server Error}
 */
router.get('/', getAllMessages);

module.exports = router;
