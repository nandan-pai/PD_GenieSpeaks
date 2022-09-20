const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  review_star: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    default: null
  },
  ecommerce: {
    type: mongoose.Types.ObjectId,
    ref: 'ECommerce',
    required: true
  },
  reviewed_on: {
    type: String,
    default: Date.now()
  },
  scrapped_on: {
    type: Number,
    default: Date.now()
  },
  verified: {
    type: Boolean,
    default: false
  }
})

const Review = mongoose.model('Review', ReviewSchema, 'Review')

module.exports = Review
