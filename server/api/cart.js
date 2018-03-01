const router = require('express').Router()

//this will be when we open up our orders
router.get('/', (req, res, next) => {
    req.session.cart = {1: 1, 2: 2, 3: 3}
    // if (req.session.cart) {
    // }
    res.json(req.session.cart)
    console.log(req.session.cart)
})

//when someone adds item to cart
router.post('/', (req, res, next) => {
    if(!req.session.cart){
        req.session.cart = {}
    } else {
        //get productId from req.body
        //if ID exists, increment; else, add key-value pair
    }
})



module.exports = router