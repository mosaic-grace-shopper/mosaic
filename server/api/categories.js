const router = require('express').Router()
const { Category } = require('../db/models')

router.get('/', (req, res, next) => {
    Category.findAll({
    })
        .then(categories => res.json(categories))
        .catch(next)
})


router.get('/:id', (req, res, next) => {
    Category.findOne(req.params.id)
        .then(category => res.json(category))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Category.create(req.body)
        .then(newCategory => res.status(201).json(newCategory))
})

router.put('/:id', (req, res, next) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    }).then(([num, updatedCategory]) => {
        num ? res.json(updatedCategory[0]) : res.status(404).send()
    })
        .catch(next)
})

router.delete(':/id', (req, res, next) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(rowDeleted => {
            rowDeleted ? res.status(205).send()
                : res.status(404).send();
        })
        .catch(next)
})


module.exports = router
