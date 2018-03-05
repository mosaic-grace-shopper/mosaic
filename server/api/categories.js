const router = require('express').Router()
const { Category } = require('../db/models')
const { isAdmin, isLoggedIn } = require('./utils')


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

router.post('/', isAdmin, (req, res, next) => {
    Category.create(req.body)
        .then(newCategory => res.status(201).json(newCategory))
})

router.put('/:id', isAdmin, (req, res, next) => {
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

router.delete('/:id', isAdmin, (req, res, next) => {
    let isAdmin = req.user !== undefined ? req.user.isAdmin : false;
    let query = isAdmin ? { where: { id: req.params.id } } : {}
    Category.destroy(query)
      .then(() => res.sendStatus(202))
      .catch(next)
  })

module.exports = router
