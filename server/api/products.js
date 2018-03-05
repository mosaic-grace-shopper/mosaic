const router = require('express').Router()
const { Product, Review} = require('../db/models')
const { isAdmin } = require('./utils')

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

router.post('/', isAdmin, (req, res, next) => {
    Product.create({ id: req.params.id } )
        .then(newProduct => res.json(newProduct))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(next)
})

router.get('/reviews/:id', (req, res, next) => {
    Review.findAll({
        where: {
            productId: req.params.id
        }
    })
        .then(reviews => res.json(reviews))
        .catch(next)
})

router.put('/:id', isAdmin, (req, res, next) => {
    Product.findById({ id: req.params.id })
      .then(product => product.update(req.body))
      .then(updatedProduct => res.json(updatedProduct))
      .catch(next)
  })

  router.delete('/:id', isAdmin, (req, res, next) => {
    let query = isAdmin ? {where: { id: req.params.id } } : {} 
    Product.destroy(query)
      .then(() => res.sendStatus(202))
      .catch(next)
  })

module.exports = router
