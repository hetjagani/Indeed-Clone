const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema({
  name: String,
});

const MediumSchema = new mongoose.Schema({
  url: String,
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
  companyId: mongoose.Types.ObjectId,
});

const JobSchema = new mongoose.Schema({
  title: String,
  industry: IndustrySchema,
  city: String,
  state: String,
  country: String,
  address: String,
  summary: [String],
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

const Company = mongoose.model('companies', CompanySchema);
const Employer = mongoose.model('employers', EmployerSchema);
const Job = mongoose.model('jobs', JobSchema);

module.exports = {
  Company,
  Employer,
  Job,
};
