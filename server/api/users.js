const router = require('express').Router()
const { User } = require('../db/models')
const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

router.get('/', isAdmin, (req, res, next) => {
  let query = req.user.isAdmin ? {attributes: ['id', 'email', 'isAdmin']} : {} 
  User.findAll(query)
    .then(users => res.json(users))
    .catch(next)
})

router.put('/make-admin/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(foundUser => foundUser.update({ isAdmin: true }))
    .then(madeAdmin => res.json(madeAdmin))
    .catch(next)
})

router.put('/delete-admin/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(foundUser => foundUser.update({ isAdmin: false }))
    .then(madeAdmin => res.json(madeAdmin))
    .catch(next)
})


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})


router.delete('/:id', (req, res, next) => {
// you won't see users if you're not an admin anyway
  User.destroy({where: { id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch(next)
})



