const router = require('express').Router()
const { Order } = require('../db/models')
const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

// router.get('/', isAdmin, (req, res, next) => {

//   let query = req.user.isAdmin ? {attributes: ['id', 'status', 'total']} : {} 
//   Order.findAll()
//     .then(orders => res.json(orders))
//     .catch(next)
// })

router.get('/', (req, res, next) => {
    Order.findAll()
        .then(orders => {
            console.log("fetching orders", orders )
            res.json(orders)
        })
        .catch(next)
})
