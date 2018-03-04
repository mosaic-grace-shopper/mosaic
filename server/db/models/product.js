const Sequelize = require('sequelize');
const db = require('../db');




const Product = db.define('product', {
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Untitled'
  },
  description: {
    type: Sequelize.TEXT,
    // Maybe add charachter minimum?
  },
  price: {
   type: Sequelize.DECIMAL,
   allowNull: false,
   defaultValue: 0,
   validate: {
     min: 0,
   }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imgUrl: {
   type: Sequelize.STRING,
   allowNull: false,
   defaultValue: 'https://c2.staticflickr.com/8/7742/17504602910_92edbff02f_b.jpg',
   //maybe think about custom validation for images?
  }
});

module.exports = Product;
