const { Schema, Types, model } = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

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
  salaries:[{
  salaryId:Number,  
  companyId: String,
  currentlyWorking:Boolean,
  endDate: Date,
  salary : Number,
  title:String,
  experience: String,
  benefits:[String],
  industry:String,
  company:String
  }],
  
},{timestamps:true});

autoIncrement.initialize(mongoose.connection);

UserSchema.plugin(autoIncrement.plugin,{
  model:"users",
  field:'salaries.salaryId',
  startAt:1,
  incrementBy:1,
})

const User = model('users', UserSchema);
const UserSalary = model('salaries', UserSalarySchema);

module.exports = {
  User,
  UserSalary,
};
