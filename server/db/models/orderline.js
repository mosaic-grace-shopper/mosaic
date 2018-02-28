const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product')

const OrderLine = db.define('orderline', {
// spacing -- KHEJ
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 0
        }
    },

    linePrice: {
        type: Sequelize.FLOAT, // I would go decimal (see orderline) -- KHEJ
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
        }).catch(err => console.log(err)) // no. Don't handle errors here. If you do rethrow the error. Handle them in the route and send a RESPONSE :D -- KHEJ
})


module.exports = OrderLine;
