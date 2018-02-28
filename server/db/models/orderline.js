const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product')

const OrderLine = db.define('orderline', {

    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 0
        }
    },

    linePrice: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0
        }
    },
    lineTotal: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.quantity * this.price
        }
    }
})


OrderLine.beforeCreate(orderLine => {
    orderLine.getProduct()
        .then(product => {
            orderLine.linePrice = product.price
            orderLine.save()
        }).catch(err => console.log(err))
})


module.exports = OrderLine;
