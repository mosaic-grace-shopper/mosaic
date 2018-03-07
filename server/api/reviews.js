const router = require('express').Router()

const { Review, Product } = require('../db/models')

const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

router.get('/', (req, res, next) => {
    Review.findAll({
        include: [{ all: true }, { model: Product }]
    })
        .then(reviews => res.json(reviews))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Review.findById(req.params.id, {include: [{model: Product}]})
        .then(review => res.json(review))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Review.create(req.body)
        .then(review => res.json(review)
        .catch(next))
})

router.delete('/:id', (req, res, next) => {
    Review.destroy({where: {
        id: req.params.id
    }
})
    .then(() => res.sendStatus(204))
    .catch(next)
})
