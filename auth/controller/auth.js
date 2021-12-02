const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const { ObjectId } = require('mongodb');
const { errors } = require('u-server-utils');
const { User } = require('../model');
const { getPasswordHash, validatePassword, validatePassHash } = require('../util/passwords');

const JWT_SECRET = 'myubereatessuperdupersecret';

const getToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json(errors.badRequest);
    return;
  }

  if (email === global.gConfig.admin_email && password === global.gConfig.admin_password) {
    const accessToken = jwt.sign(
      {
        id: 'admin',
        role: 'admin',
      },
      JWT_SECRET,
      { expiresIn: '1d' },
    );

    res.json({ token: accessToken });
    return;
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(401).json({ ...errors.unauthorized, message: 'user does not exists' });
    return;
  }

  if (!(await validatePassHash(password, user.password))) {
    res.status(401).json({ ...errors.unauthorized, message: 'invalid password' });
    return;
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' },
  );

  res.json({ token: accessToken });
};

const signUp = async (req, res) => {
  const { email, password, role } = req.body;

  // validate email and password
  if (!email || !password || !role) {
    res.status(400).json(errors.badRequest);
    return;
  }
  if (
    !emailValidator.validate(email) ||
    !validatePassword(password) ||
    !(role === 'user' || role === 'employer')
  ) {
    res.status(400).json({
      ...errors.badRequest,
      error: 'invalid email or password',
      message:
        'Email should be valid email. Password should have 8-100 length and should contain atleast one uppercase, lowercase and a digit. Role should be either user/employer.',
    });
    return;
  }

  const findUser = await User.findOne({ where: { email } });
  if (findUser) {
    res
      .status(400)
      .json({ ...errors.badRequest, message: 'User already exist. Please try login.' });
    return;
  }

  const passHash = await getPasswordHash(password);
  const user = await User.create({
    id: new ObjectId().toString(),
    email,
    password: passHash,
    role,
  });

  if (!user) {
    res.status(500).json(errors.serverError);
    return;
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' },
  );

  res.json({ token: accessToken });
};

const validateToken = async (req, res) => {
  if (!req.query.token) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const { token } = req.query;

  jwt.verify(token, JWT_SECRET, async (err, data) => {
    if (err) {
      res.status(401).json({ valid: false });
      return;
    }

    if (data.id === 'admin' && data.role === 'admin') {
      res.status(200).json({ valid: true, role: data.role, user: data.id });
      return;
    }

    const user = await User.findOne({ where: { id: data.id } });

    if (!user) {
      res.status(401).json(errors.unauthorized);
      return;
    }

    res.status(200).json({ valid: true, role: data.role, user: user.id });
  });
};

module.exports = {
  getToken,
  signUp,
  validateToken,
};
