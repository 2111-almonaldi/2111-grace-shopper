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
Product.belongsToMany(Order, {through: Cart})

// USER VS PRODUCT - make a wishllist ? later on...
User.belongsToMany(Product, {through: 'join-product-user', as: 'wishlist'});
Product.belongsToMany(User, {through: 'join-product-user', as: 'wishlist'});

// PRODUCT VS PRODUCTCATEGORY
Product.belongsToMany(ProductCategory, {through: 'join-product-category', as: 'categories'});
ProductCategory.belongsToMany(Product, {through: 'join-product-category', as: 'categories'});


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
