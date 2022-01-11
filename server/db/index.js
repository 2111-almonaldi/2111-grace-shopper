//this is the access point for all things database related!

const db = require('./db')

const {User} = require('./models/User')
const {Product} = require('./models/Product')
const {ProductCategory} = require('./models/ProductCategory')
const {Cart} = require('./models/Cart')
const {Order} = require('./models/Order')

//associations could go here!

// USER VS ORDER
User.hasMany(Order)
Order.belongsTo(User)

// ORDER VS PRODUCT - Cart is the join table of product and order
Order.belongsToMany(Product, {through: Cart})
Product.belongsToMany(Product, {through: Cart})

// USER VS PRODUCT - make a wishllist ? later on...
User.belongsToMany(Product, {through: 'wishlist'});
Product.belongsToMany(User, {through: 'wishlist'});

// PRODUCT VS PRODUCTCATEGORY
Product.belongsTo(ProductCategory);
ProductCategory.hasMany(Product);


module.exports = {
  db,
  models: {
    User,
    Cart,
    Order,
    Product,
    ProductCategory
  }
}
