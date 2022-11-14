const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  attributes: {
    type: Map,
    default: {}
  },
  identifiers: {
    type: Map,
    default: {}
  },
  tags: {
    type: [String],
    default: []
  },
  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  ecommerce: {
    type: [Map],
    ref: 'ECommerce',
    default: []
  },
  rating_count: {
    type: Number,
    default: 0
  },
  reviews: {
    type: [mongoose.Types.ObjectId],
    ref: 'Review',
    default: []
  }
})

const Product = mongoose.model('Product', ProductSchema, 'Product')

module.exports = Product
