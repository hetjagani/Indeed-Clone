const { Types } = require('mongoose');
const mongoose = require('mongoose');

const getCompanyConnection = () => {
  const companyConn = mongoose.createConnection(global.gConfig.company_conn);
  mongoose.set('debug', true);

  const IndustrySchema = new mongoose.Schema({
    name: String,
  });

  const MediumSchema = new mongoose.Schema({
    url: String,
    altText: String,
  });

  const CompanySchema = new mongoose.Schema({
    name: String,
    description: mongoose.Schema.Types.Mixed,
    about: String,
    workCulture: String,
    values: String,
    foundedOn: Date,
    mission: String,
    ceo: String,
    industry: IndustrySchema,
    headquarters: String,
    revenue: String,
    size: Number,
    website: String,
    type: String,
    avgHappinessScore: Number,
    learningScore: Number,
    appreciationScore: Number,
    employers: [mongoose.Types.ObjectId],
    media: [MediumSchema],
  });

  const EmployerSchema = new mongoose.Schema({
    name: String,
    role: String,
    address: String,
    dateOfBirth: String,
    medium: MediumSchema,
    companyId: Types.ObjectId,
  });

  const JobSchema = new mongoose.Schema({
    title: String,
    industry: IndustrySchema,
    city: String,
    state: String,
    country: String,
    address: String,
    jobLocation: {
      type: String,
      enum: ['remote', 'in_person'],
    },
    type: {
      type: String,
      enum: ['internship', 'full_time', 'contract'],
    },
    zipcode: Number,
    postedOn: Date,
    salary: Number,
    description: mongoose.Schema.Types.Mixed,
    isFeatured: Boolean,
    questions: [String],
    companyId: mongoose.Types.ObjectId,
  });

  const Company = companyConn.model('companies', CompanySchema);
  const Employer = companyConn.model('employers', EmployerSchema);
  const Job = companyConn.model('jobs', JobSchema);

  return { companyConn, Company, Employer, Job };
};

const getUserConnection = () => {
  const userConn = mongoose.createConnection(global.gConfig.user_conn);
  mongoose.set('debug', true);

  const UserSchema = new mongoose.Schema({
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

  const User = userConn.model('users', UserSchema);

  return { userConn, User };
};

module.exports = {
  getCompanyConnection,
  getUserConnection,
};
