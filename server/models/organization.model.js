const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: {
    type: [mongoose.Types.ObjectId],
    ref: 'Product',
    default: []
  }
})

const Organization = mongoose.model('Organization', OrganizationSchema, 'Organization')

module.exports = Organization
