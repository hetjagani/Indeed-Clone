const { Schema, Types, model } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  about: String,
  contactNo: String,
  emails: [String],
  resumes: [String],
  coverLetters: [String],
  city: String,
  state: String,
  country: String,
  zip: String,
  jobPreferences: [String]
});

const User = model('users', UserSchema);

module.exports = {
  User,
};
