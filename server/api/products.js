const router = require('express').Router()
const { Product, Review } = require('../db/models')

router.get('/', (req, res, next) => {
    // `/api/products?category=photo`
    // req.query = {category: 'photo'}
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

router.get('/:id', (req, res, next) => { // consider if every time you get a single product you want to populate the review. Then you don't need another request -- KHEJ
    Product.findOne(req.params.id) // consider findById -- KHEJ
        .then(product => res.json(product))
        .catch(next)
})

router.get('/reviews/:id', (req, res, next) => { // I would expect `/api/products/productId/reviews/reviewId`
    // make a helpt ticket if it errors when you reverse it
    // Also I would expect for you to be using Product.findById(include:[Review]) --  KHEJ
    Review.findAll({
        where: {
            productId: req.params.id
        }
    })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => { // who can do this? -- KHEJ
    Product.create(req.body)
        .then(newProduct => res.status(201).json(newProduct))
        // catch errors -- KHEJ
})

router.put('/:id', (req, res, next) => {
    Product.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    }).then(([num, updatedProduct]) => { // updatedProducts -- plural -- KHEJ
        num ? res.json(updatedProduct[0]) : res.status(404).send() // prefer if you use your error handling middleware -- KHEJ
    })
        .catch(next)
})
// .then on own line sometimes
// 4 spaces for tab sometimes... -- KHEJ

router.delete(':/id', (req, res, next) => { // type `/:id`
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(rowDeleted => {
            rowDeleted ? res.status(205).send() // 204 status -- KHEJ
                : res.status(404).send(); // error thing same as above -- KHEJ
        })
        .catch(next)
})

module.exports = router
