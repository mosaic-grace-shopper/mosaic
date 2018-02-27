const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id',(req,res,next) => {
    Product.findOne(req.params.id)
    .then(product => res.json(product))
    .catch(next)
})

router.post('/',(req,res,next) => {
    Product.create(req.body)
    .then(newProduct => res.status(201).json(newStudent))
})

router.put('/:id', (req,res,next) => {
    Product.update(req.body, {
        where :{
            id : req.params.id
        },
        returning : true
    }).then(([num, updatedProduct]) => {
        num ? res.json(updatedProduct[0]) : res.status(404).send()
    })
    .catch(next)
})

router.delete(":/id", (req,res,next) => {
    Product.destroy({
        where : {
            id : req.params.id
        }
    })
    .then(rowDeleted => {
        rowDeleted ? res.status(205).send()
 : res.status(404).send();    
})
.catch(next)
})

module.exports = router