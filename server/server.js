const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

require('./db_init.js')
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true
}))

// logging middleware
const requestLogger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const log = `${method}:${url}`
  console.log(log)
  next()
}
app.use(requestLogger)

// Validate DB Connection
const validateDBConn = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(404).json({
      'error': {
        'code': 503,
        'error_ref': 12,
        'message': 'Service Unavailable. Database Connection Failure.'
      }
    })
  }
  next()
}
app.use(validateDBConn)

// Links
app.use('/api/static', express.static('public'))

app.use('/api/user', require('./user-router/user.router.js'))
app.use('/api/prod', require('./product-router/product.router.js'))

app.use('*', (req, res) =>
  res.status(404).json({
    'error': {
      'code': 404,
      'error_ref': 11,
      'message': 'The resource requested could not be found.'
    }
  })
)

module.exports = app
