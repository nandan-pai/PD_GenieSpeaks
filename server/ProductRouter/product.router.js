const router = require('express').Router()
const mongoose = require('mongoose')

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
        path: 'ecommerce.ecommerceID',
        model: ECommerce,
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

    const search_query = {
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

    let category = await Product.aggregate(
      [
        {
          '$match': search_query
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
          '$group': {
            '_id': null,
            'min_price': {
              '$min': '$ecommerce.curr_price'
            },
            'max_price': {
              '$max': '$ecommerce.curr_price'
            },
            'ecommerce_list': {
              '$push': {
                '_id': '$ecommerce.ecommerceID',
                'name': '$ecommerce.info.name'
              }
            },
            'organization_list': {
              '$push': {
                '_id': '$organization._id',
                'name': '$organization.name'
              }
            },
            'cpu_type': {
              '$push': {
                '$concat': '$attributes.Processor Type'
              }
            }
          }
        }, {
          '$group': {
            '_id': null,
            'category_list': {
              '$push': {
                'name': 'Price',
                'type': 'range',
                'identifier': 'ecommerce.curr_price',
                'return': 'range',
                'value': [
                  '$min_price', '$max_price'
                ]
              }
            },
            'organization_list': {
              '$first': '$organization_list'
            },
            'cpu_type': {
              '$first': '$cpu_type'
            },
            'ecommerce_list': {
              '$first': '$ecommerce_list'
            }
          }
        }, {
          '$unwind': {
            'path': '$ecommerce_list'
          }
        }, {
          '$group': {
            '_id': {
              '_id': '$ecommerce_list._id',
              'name': '$ecommerce_list.name'
            },
            'count': {
              '$sum': 1
            },
            'organization_list': {
              '$first': '$organization_list'
            },
            'cpu_type': {
              '$first': '$cpu_type'
            },
            'category_list': {
              '$first': '$category_list'
            }
          }
        }, {
          '$group': {
            '_id': null,
            'ecommerce_list': {
              '$push': {
                '_id': '$_id._id',
                'name': '$_id.name',
                'count': '$count'
              }
            },
            'organization_list': {
              '$first': '$organization_list'
            },
            'cpu_type': {
              '$first': '$cpu_type'
            },
            'category_list': {
              '$first': '$category_list'
            }
          }
        }, {
          '$project': {
            'category_list': {
              '$concatArrays': [
                '$category_list', [
                  {
                    'name': 'Ecommerce',
                    'type': 'checklist',
                    'identifier': 'ecommerce.ecommerceID',
                    'return': 'ObjectId',
                    'value': '$ecommerce_list'
                  }
                ]
              ]
            },
            'organization_list': 1,
            'cpu_type': 1
          }
        }, {
          '$unwind': {
            'path': '$organization_list'
          }
        }, {
          '$group': {
            '_id': {
              '_id': '$organization_list._id',
              'name': '$organization_list.name'
            },
            'count': {
              '$sum': 1
            },
            'cpu_type': {
              '$first': '$cpu_type'
            },
            'category_list': {
              '$first': '$category_list'
            }
          }
        }, {
          '$group': {
            '_id': null,
            'organization_list': {
              '$push': {
                '_id': '$_id._id',
                'name': '$_id.name',
                'count': '$count'
              }
            },
            'cpu_type': {
              '$first': '$cpu_type'
            },
            'category_list': {
              '$first': '$category_list'
            }
          }
        }, {
          '$project': {
            'category_list': {
              '$concatArrays': [
                '$category_list', [
                  {
                    'name': 'Organization',
                    'type': 'checklist',
                    'identifier': 'organization',
                    'return': 'ObjectId',
                    'value': '$organization_list'
                  }
                ]
              ]
            },
            'cpu_type': 1
          }
        }, {
          '$unwind': {
            'path': '$cpu_type'
          }
        }, {
          '$group': {
            '_id': '$cpu_type',
            'count': {
              '$sum': 1
            },
            'category_list': {
              '$first': '$category_list'
            }
          }
        }, {
          '$group': {
            '_id': null,
            'cpu_type': {
              '$push': {
                '_id': '$_id',
                'name': '$_id',
                'count': '$count'
              }
            },
            'category_list': {
              '$first': '$category_list'
            }
          }
        }, {
          '$project': {
            'category_list': {
              '$concatArrays': [
                '$category_list', [
                  {
                    'name': 'CPU Types',
                    'type': 'checklist',
                    'identifier': 'attributes.Processor Type',
                    'return': 'name',
                    'value': '$cpu_type'
                  }
                ]
              ]
            }
          }
        }
      ]
    )

    res.status(200).json({
      category: category.length ? category[0].category_list : category
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

router.post('/search', async (req, res) => {
  try {
    const query = req.body.query
    let offset = req.body.offset
    let limit = req.body.limit
    let sort = req.body.sort
    const filter = req.body.filter
    let sort_form = 1;

    if (!query) {
      return res.status(400).json({ message: 'Requires Query' })
    }
    if (!limit) {
      limit = 10
    }
    if (!offset) {
      offset = 0
    }
    if (!sort) {
      sort = "_id"
    } else {
      if (sort[0] === "-") {
        sort_form = -1
        sort = sort.substr(1)
      }
    }
    let filter_query = {}
    if (filter !== {}) {
      for (var key in filter) {
        if (filter.hasOwnProperty(key) && filter[key].value.length) {
          if (filter[key].type === 'range') {
            filter_query[filter[key].identifier] = {
              '$gte': filter[key].value[0], '$lte': filter[key].value[1]
            }
          } else {
            let temp = []
            if (filter[key].type === 'ObjectId') {
              filter[key].value.forEach((value, index, array) => {
                temp.push(mongoose.Types.ObjectId(value))
              })
            } else {
              temp = filter[key].value
            }
            filter_query[filter[key].identifier] = {
              '$in': temp
            }
          }
        }
      }
    }

    // console.log(filter_query)
    const search_query = {
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

    //For Future me
    //Remove the querys from the facet. simple
    //it contains a list of documents, this document itself, like other documents in mongodb, is limited to 16MB.
    //The $limit can be used to limit its size, though a single document in the response may violate it.
    //Therefore, if you suspect the result may exceed 16MB, the best way is to query twice.

    let product_details = await Product.aggregate(
      [
        {
          '$match': {
            '$and': [
              search_query,
              filter_query
            ]
          }
        }, {
          '$facet': {
            'product_count': [
              {
                '$count': 'count'
              }
            ],
            'product_list': [
              {
                '$addFields': {
                  'review_count': {
                    '$size': '$reviews'
                  }
                }
              }, {
                '$sort': {
                  [sort]: sort_form
                }
              }, {
                '$skip': parseInt(offset, 10)
              }, {
                '$limit': parseInt(limit, 10)
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
          }
        }
      ]
    )
    let product_list = product_details[0].product_list
    let product_count = 0
    if (product_details[0].product_count.length) {
      product_count = product_details[0].product_count[0].count
    }

    res.status(200).json({
      product_count,
      product_list
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error', error: e })
  }
})

module.exports = router
