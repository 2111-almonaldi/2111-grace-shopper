const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { STRING, INTEGER, TEXT, DECIMAL } = Sequelize
const db = require('../db')
// Carly Note: Think about Pagination here down the line

const Product = db.define('user', {
  name: {
    type: STRING,
    allowNull: false
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    defaultValue: 'https://placeholder.jpg',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      notEmpty: true,
      min: 0.99
    }
  },
  description: {
    type: TEXT,
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: true,
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = Product


/**
 * instanceMethods
 */


/**
 * classMethods
 */
Product.updateInventory = async function(purchasedProducts){
  for (let i = 0; i < purchasedProducts.length; i++) {
    let purchasedProduct = purchasedProducts[i];
    await purchasedProduct.update({
      quantity: purchasedProduct.quantity - purchasedProduct.cart.cartQuantity
    })
  }
}







