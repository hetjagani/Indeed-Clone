const bcrypt = require('bcrypt');
const PasswordValidator = require('password-validator');

const getPasswordHash = async (pass) => {
  const hash = await bcrypt.hash(pass, 10);
  return hash;
};

const validatePassHash = async (pass, dbHash) => bcrypt.compare(pass, dbHash);

const schema = new PasswordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1); // Must have at least 1 digits

const validatePassword = (pass) => schema.validate(pass);

module.exports = { getPasswordHash, validatePassHash, validatePassword };
