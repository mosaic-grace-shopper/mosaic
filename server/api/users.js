const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/make-admin/:id', (req, res, next) => { // why not just have put. Then inside of the put check if the requestor is admin; if not, delete req.body.isAdmin or something like that. Also make sure person is logged in. Check if :id is self or req.user is admin -- KHEJ
  if (!req.user.isAdmin) delete req.body.isAdmin
    // then this can be a general put of just the req.body
  User.findById(req.params.id)
    .then(foundUser => foundUser.update({ isAdmin: true }))
    .then(madeAdmin => res.json(madeAdmin))
    .catch(next)
})

router.get('/:id', (req, res, next) => { // self or admin -- kHEJ
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})


router.delete('/:id', (req, res, next) => { // 
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(202)) // 204? Also sendstatus sometimes, be consistent -- KHEJ
    .catch(next)
})
