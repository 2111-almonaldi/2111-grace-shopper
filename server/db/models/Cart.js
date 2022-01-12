const Sequelize = require('sequelize')
const { INTEGER, DECIMAL} = Sequelize
const db = require('../db')
const { Product } = require('./Product')
const User = require('./User')
const Order = require('./Order')

const Cart = db.define('cart', {
  cartQuantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  checkoutPrice: {
    type: DECIMAL
  }
})


module.exports = {Cart}


/**
 * classMethods
 */

// // CARLY NOTE: FIGURE OUT HOW TO CREATE USER INSTANCE HERE!!!!
// Cart.getUserItems = async function(userId, productId){
//   // const user = await this.getUser();
//   const order = await User.getOrders({
//     include: [Order],
//     where: {
//       status: "PROCESSING"
//     }
//   })
//   return order[0].getProducts(productId ? { where: { id: productId } } : {})
// }
// // Cart.addProducts = async function(products){
// //   let order = await user.getOrders({
// //     where: {
// //       status: "PROCESSING"
// //     }
// //   });
// //   order = order[0];

// //   for (let i = 0; i < products.length; i++) {
// //     const {id, cartQuantity } = products
// //     const dbProduct = await Product.findByPk(id);
// //     const products = await order


// // Cart.updateCartQuanity = async (user, productId, newQuantity)


