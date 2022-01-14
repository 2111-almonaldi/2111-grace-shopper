const Sequelize = require('sequelize');
const { ENUM, ARRAY, VIRTUAL, STRING } = Sequelize;
const db = require('../db');
const { Product } = require('./Product');
const { User } = require('./User');

const Order = db.define('order', {
	status: {
		type: ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'FULFILLED'),
		allowNull: false,
		defaultValue: 'CREATED',
	},
	// items: {
	// 	type: ARRAY(Sequelize.JSON)
	// },
	subtotal: {
		type: VIRTUAL,
		get() {
			if (this.items.length) {
				return this.items
					.map((item) => {
						item.quantity * item.price;
					})
					.reduce((a, b) => a + b, 0);
			}
		},
	},
	customerName: {
		type: STRING,
	},
	customerEmail: {
		type: STRING,
	},
	customerAddress: {
		type: STRING,
	},
	customerPhone: {
		type: STRING,
	},
});

// add in skus -> product details / order details
// orderdetails

module.exports = { Order };

// Order.checkout = async function(){

// Order.guestCheckout = async function()

// // CARLY NOTE: FIGURE OUT HOW TO CREATE USER INSTANCE HERE!!!!

Order.prototype.getUserItems = async function(userId, productId){
  const user = await User.findByPk(userId)
  const userOrder = await user.getOrders({
    where: { status: "PROCESSING"}
  })
  return userOrder[0].getProducts(productId ? { where: { id: productId } } : {})
}
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
