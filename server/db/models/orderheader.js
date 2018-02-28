const Sequelize = require('sequelize');
const db = require('../db');

// consider merging with fullorder; if you run into issues with total make it a getter or calculate on the frontend -- KHEJ

const OrderHeader = db.define('orderheader', {
    status: {
        type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
        defaultValue: 'Created'
    },

    total: {
        type: Sequelize.DOUBLE, // decimal is usually used for money; double for lat, lng. (10,2) to make it look like money -- KHEA
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
})

module.exports = OrderHeader;
