/* eslint-disable no-underscore-dangle */
const { errors } = require('u-server-utils');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const { Chat } = require('../model');
const { Types } = require('mongoose');
const { forEach } = require('lodash');

const getAllChats = async (req, res) => {
  try {
    const { page, limit } = req.query;

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

    const listChats = await Chat.findAndCountAll({
      where: queryObj,
      order: [
        ['createdAt', 'DESC'],
      ],
      limit,
      offset,
    });

    if (!listChats) {
      res.status(404).json({
        ...errors.notFound,
        message: 'Chat does not exist for a given User',
      });
      return;
    }


    const allEmployers = await axios.get(`${global.gConfig.company_url}/employers`, {
      params: { all: 'true' },
      headers: { Authorization: req.headers.authorization },
    });

    const employerMap = new Map();

    allEmployers.nodes.forEach((ele) => {
      employerMap.set(ele._id, ele);
    });

    listChats.rows.forEach((ele) => {
      ele.employer = employerMap.get(ele.employerId);
      delete ele.employerId;
    });

    res.status(200).json({total: listChats.count, nodes: listChats.rows});
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
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
        message: 'Chat does not exist',
      });
      return;
    }

    const getUser = await axios.get(
      `${global.gConfig.user_url}/users/${chat.userId}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    );

    if (!getUser) {
      res.status(500).json(errors.serverError);
      return;
    }
    chat.user = getUser;
    delete chat.userId;

    const getEmployee = await axios.get(
      `${global.gConfig.company_url}/employers/${chat.employerId}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    );

    if (!getEmployee) {
      res.status(500).json(errors.serverError);
      return;
    }
    chat.employee = getEmployee;
    delete chat.employerId;

    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

const createChat = async (req, res) => {
  try {
    const { user, role } = req.headers;
    if (role === 'employer') {
      res.status(400).json({
        ...errors.badRequest,
        message: 'Only employer can initiate chat',
      });
      return;
    }

    const valErr = validationResult(req);
    if (!valErr.isEmpty()) {
      console.error(valErr);
      res.status(400).json({ status: 400, message: valErr.array() });
      return;
    }

    const chatExists = await Chat.findOne({
      where: {
        employerId: Types.ObjectId(user),
        userId: Types.ObjectId(req.body.userId),
      },
    });

    if (chatExists) {
      res.status(400).json({
        ...errors.badRequest,
        message: 'Chat Already Exists',
      });
      return;
    }

    const data = req.body;
    data._id = new ObjectId().toString();
    data.employerId = user;

    const newChat = await Chat.create({
      data,
    });

    const getUser = await axios.get(
      `${global.gConfig.user_url}/users/${newChat.userId}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    );

    if (!getUser) {
      res.status(500).json(errors.serverError);
      return;
    }
    newChat.user = getUser;
    delete newChat.userId;

    const getEmployee = await axios.get(
      `${global.gConfig.company_url}/employers/${newChat.employerId}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    );

    if (!getEmployee) {
      res.status(500).json(errors.serverError);
      return;
    }
    newChat.employee = getEmployee;
    delete newChat.employerId;

    res.status(201).json(newChat);
  } catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    res.status(500).json(errors.serverError);
  }
};

module.exports = {
  getAllChats,
  getChatById,
  createChat,
};
