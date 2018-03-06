const router = require('express').Router()
const { OrderLine } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  OrderLine.findAll()
  .then(orderLine => { res.json(orderLine) })
  .catch(next)
})

//is this a find by id? or a find where productid and orderid match...
//should route be /:id?
router.put('/:id', (req, res, next) => {
  OrderLine.findById(req.params.id)
  .then(orderLine => orderLine.update(req.body))
  .then(updatedOrderLine => res.json(updatedOrderLine))
  .catch(next)
});

router.post('/', (req, res, next) => {
  OrderLine.create(req.body)
    .then(newOrder => res.status(201).json(newOrder))
})

router.delete('/:id', (req, res, next) => {
  OrderLine.destroy({
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
