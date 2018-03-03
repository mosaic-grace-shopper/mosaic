const Sequelize = require('sequelize');
const db = require('../db');

const ShipmentDetails = db.define('shipmentDetails', {
    confirmationEmail: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    },
    recipientName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = ShipmentDetails;
