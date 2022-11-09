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
  satisfactory_rating: {
    type: Number,
    default: 0
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
  reviews: {
    type: [mongoose.Types.ObjectId],
    ref: 'Review',
    default: []
  }
})

const Product = mongoose.model('Product', ProductSchema, 'Product')

module.exports = Product
