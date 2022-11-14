const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// cors
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

// Links
app.use('/api/static', express.static('public'))

app.use('/api/user', require('./UserRouter/user.router.js'))
app.use('/api/prod', require('./ProductRouter/product.router.js'))

app.use('*', (req, res) => res.status(404).json({ message: 'link not found' }))

module.exports = app
