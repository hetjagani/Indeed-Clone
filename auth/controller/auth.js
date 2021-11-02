const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const { User } = require('../model');
const { getPasswordHash, validatePassword, validatePassHash } = require('../util/passwords');

const JWT_SECRET = 'myubereatessuperdupersecret';

const getToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Bad Request');
    return;
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  if (!(await validatePassHash(password, user.password))) {
    res.status(401).send('Unauthorized');
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
    res.status(400).send('Bad Request');
    return;
  }
  if (
    !emailValidator.validate(email)
    || !validatePassword(password)
    || !(role === 'customer' || role === 'restaurant')
  ) {
    res.status(400).json({
      error: 'invalid email or password',
      requirement:
        'Email should be valid email. Password should have 8-100 length and should contain atleast one uppercase, lowercase and a digit. Role should be either customer/restaurant.',
    });
    return;
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(304).json({ message: 'User already exist. Please try login.' });
    return;
  }

  const passHash = await getPasswordHash(password);
  const user = new User({
    email,
    password: passHash,
    role,
  });
  await user.save();

  if (!user) {
    res.status(500).send('Internal Server Error');
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
    res.status(400).send('please provide token query parameter.');
    return;
  }

  const { token } = req.query;

  jwt.verify(token, JWT_SECRET, async (err, data) => {
    if (err) {
      res.status(401).send({ valid: false });
      return;
    }

    const user = await User.findOne({ _id: data.id });

    if (!user) {
      res.status(401).send('Unauthorized');
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
