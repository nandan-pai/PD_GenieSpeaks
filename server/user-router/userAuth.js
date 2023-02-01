const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

async function userAuth(req, res, next) {
  try {
    const userToken = req.cookies.userToken

    if (!userToken) {
      return res.status(401).json({
        authorized: false,
        message: 'Unauthorized',
        "error": {
          "code": 400,
          "error_ref": 13,
          "message": "No User token."
        }
      })
    }

    const { _id } = jwt.verify(userToken, process.env.JWT_SECRET)

    if ((await User.exists(_id)) === null) {
      return res.cookie('userToken', '', {
        httpOnly: true,
        expires: new Date(0)
      }).status(401).json({
        authorized: false,
        message: 'Unauthorized',
        "error": {
          "code": 400,
          "error_ref": 13,
          "message": "Invalid User token."
        }
      })
    }

    req.userInfo = jwt.verify(userToken, process.env.JWT_SECRET)

    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({
      authorized: false,
      message: 'Unauthorized',
      "error": {
        "code": 400,
        "error_ref": 13,
        "message": "No User token."
      }
    })
  }
}

module.exports = userAuth
