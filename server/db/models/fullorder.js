const Sequelize = require('sequelize');
const db = require('../db');

const FullOrder = db.define('fullorder', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = FullOrder;
