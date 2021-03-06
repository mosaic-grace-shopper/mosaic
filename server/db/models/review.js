const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
})

module.exports = Review
