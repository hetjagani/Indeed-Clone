const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
});

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = {
  Review,
};
