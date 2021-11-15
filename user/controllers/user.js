const { validationResult } = require('express-validator');
const { makeRequest } = require('../util/kafka/client');

const createUser = async (req, res) => {
  const { user } = req.headers;
  console.log(user, req.body.id)
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

    res.status(201).json(resp);
  });
};

module.exports = {
  createUser,
};
