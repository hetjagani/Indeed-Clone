/* eslint-disable no-underscore-dangle */
const { errors, getPagination } = require('u-server-utils');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Chat, Message } = require('../model');
const { Types } = require('mongoose');
const { ObjectId } = require('mongodb');

const getAllMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit, offset } = getPagination(req.query.page, req.query.limit);
    const { role, user } = req.headers;

    const queryObj = {};
    if (role === 'employer') {
      queryObj.employerId = user;
    } else if (role === 'user') {
      queryObj.userId = user;
    } else {
      res.status(401).json({
        ...errors.unauthorized,
        message: 'Chat not Authorized',
      });
      return;
    }

    queryObj._id = id;

    const chat = await Chat.findOne({
      where: queryObj,
    });

    if (!chat) {
      res.status(404).json({
        ...errors.notFound,
        message: 'Chat Not Found',
      });
      return;
    }

    const listMessages = await Message.findAndCountAll({
      where: {
        chatId: chat._id,
      },
      order: [['createdAt', 'ASC']],
      limit,
      offset,
    });

    res
      .status(200)
      .json({ total: listMessages.count, nodes: listMessages.rows });
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id, messageId } = req.params;

    const { role, user } = req.headers;

    const queryObj = {};
    if (role === 'employer') {
      queryObj.employerId = user;
    } else if (role === 'user') {
      queryObj.userId = user;
    } else {
      res.status(401).json({
        ...errors.unauthorized,
        message: 'Chat not Authorized',
      });
      return;
    }

    queryObj._id = id;

    const chat = await Chat.findOne({
      where: queryObj,
    });

    if (!chat) {
      res.status(404).json({
        ...errors.notFound,
        message: 'Chat Not Found',
      });
      return;
    }

    const message = await Message.findOne({
      where: {
        chatId: chat._id,
        _id: messageId,
      },
    });

    if (!message) {
      res.status(404).json({
        ...errors.notFound,
        message: 'Message Not found',
      });
      return;
    }

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createMessage = async (req, res) => {
  try {
    const { role, user } = req.headers;
    const { id } = req.params;

    const queryObj = {};
    if (role === 'employer') {
      queryObj.employerId = user;
    } else if (role === 'user') {
      queryObj.userId = user;
    } else {
      res.status(401).json({
        ...errors.unauthorized,
        message: 'Chat not Authorized',
      });
      return;
    }

    queryObj._id = id;

    const chat = await Chat.findOne({
      where: queryObj,
    });

    if (!chat) {
      res.status(404).json({
        ...errors.notFound,
        message: 'Chat Not Found',
      });
      return;
    }

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const data = req.body;
    data._id = new ObjectId().toString();
    data.from = user;
    data.chatId = id;

    const newMessage = await Message.create(data);

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
};
