const { validationResult } = require('express-validator');
const { makeRequest } = require('../util/kafka/client');
const { errors, getPagination } = require('u-server-utils');
const { User } = require('../model');
const {Company}= require("../../company/model")
const {Industry}= require("../../company/model")
const mongoose = require('mongoose');
const { response } = require('express');

const createUser = async (req, res) => {
  const { user } = req.headers;
  if (user !== req.body.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'employer.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const userObj = req.body;
  userObj._id = userObj.id;

  makeRequest('user.create', userObj, (err, resp) => {
    if (err || !resp) {
      console.log(err);
      res.status(500).json(errors.serverError);
      return;
    }

    console.log(resp);
    res.status(201).json(resp);
  });
};

const getAllUsers = async (req, res) => {
  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const usersCount = await User.count().skip(offset).limit(limit);

  const userList = await User.find({}).skip(offset).limit(limit);

  res.status(200).json({ total: usersCount, nodes: userList });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    res.status(404).json(errors.notFound);
    return;
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const { user } = req.headers;
  if (user != id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'id should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const userObj = req.body;
  userObj._id = id;

  makeRequest('user.update', userObj, (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }

    res.status(201).json(resp);
  });
};

const deleteUser = async (req, res) => {
  makeRequest('user.delete', req.params, (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }

    res.status(201).json(resp);
  });
};
//==========================================================

const getUserSalary = async (req, res) => {
  const { id } = req.params;
  let response=[]
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json(errors.notFound);
    return;
  }
  else {
    user.salaries.map(salaryy=>{
      response.push(
        {
          companyId: salaryy.companyId,
          userId:id,
  currentlyWorking:salaryy.currentlyWorking,
  endDate: salaryy.endDate,
  salary : salaryy.salary,
  title:salaryy.title,
  city:user.city,
  state:user.state,
  country:user.country,
  zip:user.zip,
  experience: salaryy.experience,
  benefits:salaryy.benefits,
  industry:await User.findById(salaryy.companyId).industry,
  company:await User.findById(salaryy.companyId),
        }
      )
    })
  }
  res.status(200).json(reponse);

};

const deleteUserSalary = async (req, res) => {
  makeRequest('user.deleteSalary', req.params, (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }

    res.status(201).json(resp);
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserSalary,
  deleteUserSalary
};
