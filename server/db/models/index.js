const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const OrderLine = require('./orderline')
const Order = require('./order')
const Review = require('./review')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Product)
Product.hasMany(Review)
Product.belongsTo(Category)

Category.hasMany(Product, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'cascade'
})

Order.hasMany(OrderLine)
OrderLine.belongsTo(Order, {
  onDelete: 'cascade'
})

Product.hasMany(OrderLine, {
  onDelete: 'cascade'
})
OrderLine.belongsTo(Product)



/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  OrderLine
}
