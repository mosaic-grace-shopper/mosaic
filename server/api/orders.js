const router = require('express').Router()

const { Order, OrderLine, ShipmentDetails , Product } = require('../db/models')

const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [ {model: ShipmentDetails},  {
      model: OrderLine,
      include: [Product]
  }, { all: true }],
    order: [['id', 'DESC']]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/', isLoggedIn, (req, res, next) => {
  if (isAdmin) {
    Order.findAll({
      include: [{ all: true }, { model: ShipmentDetails }]
    })
      .then(orders => res.json(orders))
      .catch(next)
  } else {
    res.json({ message: 'Not Admin User' })
    //will probably need to return orders with findByID for users orders here
  }
  if (isLoggedIn) {
    Order.findAll({
      where: { userId: req.user.id }
    })
      .then(orders => res.json(orders))
      .catch(next)
  }
})

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => {
      order.update(req.body)
    })
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body, {
    include: [OrderLine]
  })
    .then(createdOrder => {
      res.status(201).json(createdOrder)
    })
    .catch(next)
})

router.delete('/:id', isAdmin, (req, res, next) => {
  let query = isAdmin ? { where: { id: req.params.id } } : {}
  Order.destroy(query)
    .then(() => res.sendStatus(202))
    .catch(next)
})
