const router = require('express').Router()
const { ShipmentDetails } = require('../db/models')
const { isAdmin } = require('./utils')

module.exports = router

router.get('/', isAdmin, (req, res, next) => {
    ShipmentDetails.findAll()
        .then(shipmentDetails => res.json(shipmentDetails))
        .catch(next)
})

router.post('/', (req, res, next) => {
    ShipmentDetails.create(req.body)
        .then(newShipment => res.json(newShipment))
        .catch(next)
})

router.get('/:id', isAdmin, (req, res, next) => {
    ShipmentDetails.findById(req.params.id)
        .then(shipmentDetails => res.json(shipmentDetails))
        .catch(next)
})
