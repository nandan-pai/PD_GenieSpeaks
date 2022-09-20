const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profilepic: {
    type: String,
    default: 'defaults/defaultprofilepic.png'
  },
  email: {
    type: String,
    required: true
  },
  hashedpassword: {
    type: String,
    required: true,
    select: false
  },
  reviews: {
    type: [mongoose.Types.ObjectId],
    ref: 'Review',
    default: []
  },
  bookmarks: {
    type: [mongoose.Types.ObjectId],
    ref: 'Product',
    default: []
  }
})

const User = mongoose.model('User', UserSchema, 'User')

module.exports = User
