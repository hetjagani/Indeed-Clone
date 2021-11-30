const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  overallRating: Number,
  workLifeBalance: Number,
  compensation: Number,
  jobSecurity: Number,
  management: Number,
  jobCulture: Number,
  summary: String,
  helpful: Number,
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

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = {
  Review,
};
