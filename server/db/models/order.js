const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
        defaultValue: 'Created'
    },

    total: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
})

module.exports = Order;