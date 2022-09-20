const router = require('express').Router()

const Product = require('../models/product.model.js')
const User = require('../models/user.model.js')
const ECommerce = require('../models/ecommerce.model.js')
const Organization = require('../models/organization.model.js')

router.get('/', async (req, res) => {
  try {
    const prodID = req.query.id
    if (!prodID) {
      return res.status(400).json({ message: 'Requires Product ID' })
    }
    const productData = await Product.findById(prodID)
      .populate({
        path: 'organization',
        select: 'name'
      })
      .populate({
        path: 'ecommerce.$*.ecommerceID',
        select: 'name'
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user ecommerce',
          select: 'name'
        }
      })
    res.status(200).json({ productData })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query
    if (!query) {
      return res.status(400).json({ message: 'Requires Query' })
    }

    const queryOptions = {
      $or: [
        // {
        //   tags: {
        //     $in: [query]
        //   }
        // },
        {
          title: {
            $regex: query,
            $options: 'i'
          }
        },
        {
          tags: {
            $elemMatch: {
              $regex: query,
              $options: 'i'
            }
          }
        }
      ]
    }

    const productList = await Product.find(queryOptions)
      .populate({
        path: 'organization',
        select: 'name'
      })
      .populate({
        path: 'ecommerce.$*.ecommerceID',
        select: 'name'
      })

    res.status(200).json({ productList })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

module.exports = router
