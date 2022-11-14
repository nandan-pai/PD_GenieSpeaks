const router = require('express').Router()

const Product = require('../models/product.model.js')
const Review = require('../models/review.model.js')
const ECommerce = require('../models/ecommerce.model.js')
const User = require('../models/user.model.js')
const UserAuth = require('./userAuth.js')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'fill all the fields' })
    }

    const existingUser = await User.exists({ email: email })

    if (existingUser) {
      return res.status(400).json({ message: 'Email ID is taken' })
    }

    const salt = await bcrypt.genSalt()
    const hashedpassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      hashedpassword
    })

    await newUser.save()

    res.status(200).json({ message: 'Account Creation Success' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'fill all the fields' })
    }

    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.hashedpassword)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const userToken = jwt.sign({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    }, process.env.JWT_SECRET)

    return res.status(200)
      .cookie('userToken', userToken, { httpOnly: true })
      .json({ message: 'Login Success' })

  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

router.get('/logout', (req, res) => {
  res.cookie('userToken', '', {
    httpOnly: true,
    expires: new Date(0)
  }).send()
})

router.get('/verify', UserAuth, (req, res) => {
  const { _id, name, email } = req.userInfo

  return res.json({
    authorized: true,
    message: 'Success',
    _id,
    name,
    email
  }).status(200)
})

router.post('/review', UserAuth, async (req, res) => {
  try {
    const { _id, name, email } = req.userInfo
    const { productID, title, body, proof, review_star } = req.body

    const GenieSpeaks = await ECommerce.findOne({ name: 'GenieSpeaks' })

    const newReview = new Review({
      title,
      description,
      review_star,
      product: productID,
      user: _id,
      ecommerce: GenieSpeaks,
    })

    saved_review = await newReview.save()

    await Product.findByIdAndUpdate(
      { '_id': productID },
      { $push: { 'reviews': saved_review } }
    )

    await User.findByIdAndUpdate(
      { '_id': _id },
      { $push: { 'reviews': saved_review } }
    )

    res.status(200).json({ message: 'Reviewed Saved' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

module.exports = router
