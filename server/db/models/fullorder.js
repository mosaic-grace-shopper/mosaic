const Sequelize = require('sequelize');
const db = require('../db');

// remove -- KHEA

const FullOrder = db.define('fullorder', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    } // this is default
})

module.exports = FullOrder;
