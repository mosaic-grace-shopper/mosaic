const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/orderLine', require('./orderLine'))
router.use('/cart', require('./cart'))
router.use('/shipment-details', require('./shipmentDetails'))
router.use('/categories', require('./categories'))
router.use('/reviews', require('./reviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
