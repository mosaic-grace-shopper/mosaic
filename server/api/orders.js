const router = require('express').Router()
const { Order, OrderLine, Product, ShipmentDetails } = require('../db/models')
const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

router.get('/', isAdmin, (req, res, next) => {
  let isAdmin = req.user !== undefined ? req.user.isAdmin : false;
  if (isAdmin) {
    Order.findAll({
      include: [{ all: true }, {model: ShipmentDetails}]
      })
      .then(orders => res.json(orders))
      .catch(next)
  } else {
    res.json({ message: "Not Admin User" })
  }
})

router.delete('/:id', isAdmin, (req, res, next) => {
  let isAdmin = req.user !== undefined ? req.user.isAdmin : false;
  let query = isAdmin ? { where: { id: req.params.id } } : {}
  Order.destroy(query)
    .then(() => res.sendStatus(202))
    .catch(next)
})
