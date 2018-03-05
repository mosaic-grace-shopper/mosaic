const router = require('express').Router()

//this will be when we open up our orders
//also maybe for adding cart to state?
router.get('/', (req, res, next) => {
    //why don't these empty object checks work?
    if (!req.session.cart || req.session.cart === {}) res.send('There are no items in your cart!')
    else res.json(req.session.cart)
})

//when someone adds item to cart
router.put('/', (req, res, next) => {
    //we might not need empty object check...
    if (!req.session.cart || req.session.cart === {}) {
        req.session.cart = req.body
        res.json(req.session.cart)
    } else {
        //need to do checks here
        let reqKey = Object.keys(req.body);
        for (let i = 0; i < reqKey.length; i++) {
            if (req.session.cart.hasOwnProperty(reqKey[i])) {
                req.session.cart[reqKey[i]] = req.body[reqKey[i]]
            }
            else {
                req.session.cart[reqKey[i]] = req.body[reqKey[i]]
            }
        }
        res.json(req.session.cart)
    }
})

router.delete('/', (req, res, next) => {
    req.session.cart = {};
    res.sendStatus(204);
})

module.exports = router

//make a request to orders route - either post or put
//if they're logged in, then persist to the database
//if not, put it on the session cart
