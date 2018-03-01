const router = require('express').Router()

//this will be when we open up our orders
router.get('/', (req, res, next) => {
    if (req.session.cart) res.json(req.session.cart)
    else res.send('There are no items in your cart!')
    console.log(req.session.cart)

})

//when someone adds item to cart
router.put('/', (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = req.body
        res.json(req.session.cart)
    } else {
        //need to do checks here
        req.session.cart = req.body
        res.json(req.session.cart)
    }
})


module.exports = router

//make a request to orders route - either post or put
// if they're logged in, then persist to the database
//if not, put it on the session cart