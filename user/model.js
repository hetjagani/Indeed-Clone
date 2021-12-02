const { Schema, model } = require('mongoose');

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
  jobPreferences: new Schema({
    title: String,
  relocation: String,
  type: String,
  schedule: String,
  pay: String,
  remote: String,
  }),

});

const SalarySchema = new Schema({
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
  benefits: [String],
  industry: { name: { type: String } },
});

const User = model('users', UserSchema);
const Salary = model('salaries', SalarySchema);

module.exports = {
  User,
  Salary,
};
