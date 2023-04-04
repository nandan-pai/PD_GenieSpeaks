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
  stars: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    default: ''
  },
  images: {
    type: [String],
    default: []
  },
  scrapped_on: {
    type: Date,
    default: Date.now()
  },
  reviewed_on: {
    type: Date,
    default: Date.now()
  },
  verified: {
    type: Boolean,
    default: false
  },
  authentic: {
    type: Boolean,
    default: false
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
  }
})

const Review = mongoose.model('Review', ReviewSchema, 'Review')

module.exports = Review
