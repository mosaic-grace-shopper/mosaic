const router = require('express').Router()
const { User } = require('../db/models')
const { isAdmin, isLoggedIn } = require('./utils')

module.exports = router

router.get('/', isAdmin, (req, res, next) => {
  let query = req.user.isAdmin ? {attributes: ['id', 'email', 'isAdmin']} : {} 
  User.findAll(
    query
  )
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


router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  let deleteQuery = req.user.isAdmin ? {} : {where: { id: req.params.id } }
  User.destroy(deleteQuery)
    .then(() => res.sendStatus(202))
    .catch(next)
})
