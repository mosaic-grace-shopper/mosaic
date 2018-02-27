const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://c2.staticflickr.com/8/7742/17504602910_92edbff02f_b.jpg',
    //maybe think about custom validation for images?
  }
});

module.exports = Category;
