const router = require('express').Router()
const { User } = require('../db/models')
const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

router.get('/', isAdmin, (req, res, next) => {
  let isUserAdmin = req.user !== undefined ? req.user.isAdmin : false ;
  let query = isUserAdmin ? {attributes: ['id', 'email', 'isAdmin']} : {} 
  User.findAll(query)
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
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


router.delete('/:id', isAdmin, (req, res, next) => {
  let isAdmin = req.user !== undefined ? req.user.isAdmin : false ;
  let query = isAdmin ? {where: { id: req.params.id } } : {} 
  User.destroy(query)
    .then(() => res.sendStatus(202))
    .catch(next)
})



