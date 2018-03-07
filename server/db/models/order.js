const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('Saved', 'Submitted', 'Processing', 'Cancelled', 'Completed'),
        defaultValue: 'Saved'
    },

//can we make the total a getter of all totals from orderline? might be relatively similar to our orderLine.beforeCreate getter -rxet
    total: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
})

module.exports = Order;
