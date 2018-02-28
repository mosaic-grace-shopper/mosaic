const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product')

const OrderLine = db.define('orderline', {

    quantity : {
        type : Sequelize.INTEGER,
        defaultValue : 1,
        validate : {
            min : 0
        }
    },

    linePrice : {
        type : Sequelize.FLOAT,
        allowNull : false,
        validate :{
            min : 0
        }
    },
    lineTotal : {
        type : Sequelize.VIRTUAL,
        get() {
            return this.quantity * this.price
        }
    }
},
{
  hooks: {
        afterCreate: function(orderLine) {
            orderLine.getProduct()
            .then(product => {
                orderLine.linePrice = product.price
            })
        }
      }
}) 





module.exports = OrderLine;
