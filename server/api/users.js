const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:id/admin', (req, res, next) => {
  User.update({
    isAdmin: true
  }, {
    where: {
      id: req.params.id
    }
  }).spread((numberOfRows, affectedRows) => {
    res.json(affectedRows)
  })
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(next)
})


router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(user => res.sendStatus(202))
  .catch(next)

})