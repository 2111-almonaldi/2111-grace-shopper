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

// Cart.prototype.getUserItems = async function(userId, productId){
//   const user = await User.findByPk(userId)
//   const userOrder = await user.getOrders({
//     where: { status: "PROCESSING"}
//   })
//   return userOrder[0].getProducts(productId ? { where: { id: productId } } : {})
// }
// Cart.prototype.addProducts = async function(userId, products){
//   const user = await User.findByPk(userId)
//   const userOrderProducts = user.getUserItems()
//   if (userOrderProducts.length) {
//     await userOrderProducts[0].cart.cartQuantity + cartQuantity
//   } else {
//     const userOrder = await user.getOrders({
//       where: { status: "PROCESSING"}
//     })
//     userOrder.addProduct(userOrderProducts[0])
//   }



// Cart.updateCartQuanity = async (user, productId, newQuantity)


