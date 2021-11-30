/* eslint-disable no-underscore-dangle */
const { errors, getPagination } = require('u-server-utils');
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const { Chat } = require('../model');
const { Types } = require('mongoose');

const getAllChats = async (req, res) => {
  try {
    const { role, user } = req.headers;

    const { limit, offset } = getPagination(req.query.page, req.query.limit);

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
      order: [['createdAt', 'DESC']],
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

    if (role === 'user') {
      const allEmployers = await axios.get(
        `${global.gConfig.company_url}/employers`,
        {
          params: { all: 'true' },
          headers: { Authorization: req.headers.authorization },
        },
      );

      console.log(listChats.rows[0].dataValues);
      const employerMap = new Map();

      allEmployers.data.nodes.forEach((ele) => {
        employerMap.set(ele._id, ele);
      });

      listChats.rows.forEach((ele) => {
        ele.dataValues.employer = employerMap.get(ele.dataValues.employerId);
        delete ele.dataValues.employerId;
      });
    }else if(role === 'employer'){
      const allUsers = await axios.get(
        `${global.gConfig.user_url}/users`,
        {
          params: { all: 'true' },
          headers: { Authorization: req.headers.authorization },
        },
      );

      const userMap = new Map();

      allUsers.data.nodes.forEach((ele) => {
        userMap.set(ele._id, ele);
      });

      listChats.rows.forEach((ele) => {
        ele.dataValues.user = userMap.get(ele.dataValues.userId);
        delete ele.dataValues.userId;
      });
    }

    res.status(200).json({ total: listChats.count, nodes: listChats.rows });
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

    chat.dataValues.user = getUser.data;
    delete chat.dataValues.userId;

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
    chat.dataValues.employee = getEmployee.data;
    delete chat.dataValues.employerId;

    res.status(200).json(chat);
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
    if (role === 'user') {
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
        employerId: user,
        userId: req.body.userId,
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

    const newChat = await Chat.create(data);

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
    newChat.dataValues.user = getUser.data;
    delete newChat.dataValues.userId;

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
    newChat.dataValues.employee = getEmployee.data;
    delete newChat.dataValues.employerId;

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
