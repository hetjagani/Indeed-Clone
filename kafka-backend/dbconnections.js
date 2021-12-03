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
    logo: MediumSchema,
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
    summary: [String],
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

const getApplicationConnection = () => {
  const applicationConn = mongoose.createConnection(global.gConfig.application_conn);
  mongoose.set('debug', true);

  const ApplicationSchema = new mongoose.Schema({
    jobId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    resume: String,
    coverLetter: String,
    answers: mongoose.Schema.Types.Mixed,
    date: Date,
    status: {
      type: String,
      enum: ['RECEIVED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'],
    },
  });

  const Application = applicationConn.model('applications', ApplicationSchema);

  return { applicationConn, Application };
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
    jobPreferences: new mongoose.Schema({
      title: String,
    relocation: String,
    type: String,
    schedule: String,
    pay: String,
    remote: String,
    }),

  });

  const SalarySchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
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

  const User = userConn.model('users', UserSchema);
  const Salary = userConn.model('salaries', SalarySchema);

  return { userConn, User, Salary };
};

const getReviewConnection = () => {
  const reviewConn = mongoose.createConnection(global.gConfig.review_conn);
  mongoose.set('debug', true);

  const ReviewSchema = new mongoose.Schema({
    overallRating: Number,
    workLifeBalance: Number,
    compensation: Number,
    jobSecurity: Number,
    management: Number,
    helpful: Number,
    jobCulture: Number,
    summary: String,
    review: String,
    pros: String,
    cons: String,
    ceoApproval: Boolean,
    tips: String,
    companyId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    isFeatured: Boolean,
    status: {
      type: String,
      enum: ['APPROVED', 'REJECTED', 'PENDING'],
    },
    reviewDate: Date,
  });

  const Review = reviewConn.model('reviews', ReviewSchema);

  return { Review };
};

module.exports = {
  getCompanyConnection,
  getUserConnection,
  getApplicationConnection,
  getReviewConnection,
};
