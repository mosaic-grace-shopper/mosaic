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
        type: Sequelize.DECIMAL,
        validate: {
            min: 0
        }
    },
    lineTotal: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.quantity * this.linePrice
        }
    }
})


OrderLine.beforeCreate((orderLineInstance) => {
    orderLineInstance.getProduct()
        .then(product => {
            orderLineInstance.linePrice = product.price
            orderLineInstance.save()
        });
})

OrderLine.afterCreate(orderLineInstance => {
    orderLineInstance.getOrder()
    .then(order => {
        console.log("Total Before == ",order.total)
        order.total += orderLineInstance.lineTotal;
        console.log("Total == After",order.total , orderLineInstance.lineTotal  )
        order.save()
        orderLineInstance.save();
    })
})


module.exports = OrderLine;
