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

router.get('/search/category', async (req, res) => {
  try {
    const query = req.query.query
    if (!query) {
      return res.status(400).json({ message: 'Requires Query' })
    }

    let category = await Product.aggregate(
      [
        {
          '$match': {
            '$or': [
              {
                'title': {
                  '$regex': query,
                  '$options': 'i'
                }
              }, {
                'tags': {
                  '$elemMatch': {
                    '$regex': query,
                    '$options': 'i'
                  }
                }
              }
            ]
          }
        }, {
          '$lookup': {
            'from': 'Organization',
            'localField': 'organization',
            'foreignField': '_id',
            'as': 'organization'
          }
        }, {
          '$set': {
            'organization': {
              '$arrayElemAt': [
                '$organization', 0
              ]
            }
          }
        }, {
          '$unwind': {
            'path': '$ecommerce'
          }
        }, {
          '$lookup': {
            'from': 'ECommerce',
            'localField': 'ecommerce.ecommerceID',
            'foreignField': '_id',
            'as': 'ecommerce.info'
          }
        }, {
          '$set': {
            'ecommerce.info': {
              '$arrayElemAt': [
                '$ecommerce.info', 0
              ]
            }
          }
        }, {
          '$addFields': {
            'ecommerce.name': '$ecommerce.info.name'
          }
        }, {
          '$group': {
            '_id': 1,
            'ecommerce_list': {
              '$addToSet': {
                '_id': '$ecommerce.ecommerceID',
                'name': '$ecommerce.name'
              }
            },
            'organization_list': {
              '$addToSet': {
                '_id': '$organization._id',
                'name': '$organization.name'
              }
            },
            'min_price': {
              '$min': '$ecommerce.curr_price'
            },
            'max_price': {
              '$max': '$ecommerce.curr_price'
            },
            'cpu_type': {
              '$addToSet': {
                '$concat': '$attributes.Processor Type'
              }
            }
          }
        }
      ]
    )

    res.status(200).json({ category })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query
    let offset = req.query.offset
    let limit = req.query.limit
    const filter = req.query.filter

    if (!query) {
      return res.status(400).json({ message: 'Requires Query' })
    }
    if (!limit) {
      limit = 10
    }
    if (!offset) {
      offset = 0
    }

    let productList = await Product.aggregate(
      [
        {
          '$match': {
            '$or': [
              {
                'title': {
                  '$regex': query,
                  '$options': 'i'
                }
              }, {
                'tags': {
                  '$elemMatch': {
                    '$regex': query,
                    '$options': 'i'
                  }
                }
              }
            ]
          }
        }, {
          '$limit': parseInt(limit, 10)
        }, {
          '$skip': parseInt(offset, 10)
        }, {
          '$lookup': {
            'from': 'Organization',
            'localField': 'organization',
            'foreignField': '_id',
            'as': 'organization'
          }
        }, {
          '$set': {
            'organization': {
              '$arrayElemAt': [
                '$organization', 0
              ]
            }
          }
        }, {
          '$addFields': {
            'review_count': {
              '$size': '$reviews'
            },
            'min_price': {
              '$min': '$ecommerce.curr_price'
            }
          }
        }, {
          '$project': {
            '_id': 1,
            'title': 1,
            'images': 1,
            'organization._id': 1,
            'organization.name': 1,
            'review_count': 1,
            'min_price': 1
          }
        }
      ]
    )

    res.status(200).json({ productList })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

module.exports = router
