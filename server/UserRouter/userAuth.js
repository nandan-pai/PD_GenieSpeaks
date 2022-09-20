const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

async function userAuth(req, res, next) {
  try {
    const userToken = req.cookies.userToken

    if (!userToken) {
      return res.status(401).json({ authorized: false, message: 'Unauthorized' })
    }

    const { _id } = jwt.verify(userToken, process.env.JWT_SECRET)

    if ((await User.exists(_id)) === null) {
      return res.cookie('userToken', '', {
        httpOnly: true,
        expires: new Date(0)
      }).status(401).json({ authorized: false, message: 'Unauthorized' })
    }

    req.userInfo = jwt.verify(userToken, process.env.JWT_SECRET)

    next()
  } catch (err) {
    console.error(err)
    res.json({ authorized: false, message: 'Unauthorized' })
  }
}

module.exports = userAuth
