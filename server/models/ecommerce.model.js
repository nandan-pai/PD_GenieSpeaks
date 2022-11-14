const mongoose = require('mongoose')

const ECommerceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product_url: {
    type: String,
    default: []
  },
  search_url: {
    type: String,
    default: []
  },
  products_scrapped: {
    type: [mongoose.Types.ObjectId],
    ref: 'Product',
    default: []
  },
  past_scrapes: {
    type: [],
    default: []
  }
})

const ECommerce = mongoose.model('ECommerce', ECommerceSchema, 'ECommerce')

module.exports = ECommerce
