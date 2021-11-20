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
  jobPreferences: [String],
});

const UserSalarySchema = new Schema({
  companyId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  currentlyWorking: Boolean,
  endDate: Date,
  salary: Number,
  title: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  experience: String,
  benifits: [String],
  industry: { name: { type: String } },
});

const User = model('users', UserSchema);
const UserSalary = model('salaries', UserSalarySchema);

module.exports = {
  User,
  UserSalary,
};
