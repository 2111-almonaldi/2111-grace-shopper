const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { STRING, INTEGER, TEXT, FLOAT, ARRAY } = Sequelize;
const db = require("../db");
// Carly Note: Think about Pagination here down the line

const Product = db.define("product", {
  name: {
    type: STRING,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    defaultValue: "/images/defaultProduct.jpg",
    validate: {
      isUrl: true,
    },
  },
  price: {
    type: FLOAT,
    allowNull: false,
    validate: {
      isDecimal: true,
      notEmpty: true,
      min: 0.99,
    },
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: true,
      notEmpty: true,
      min: 0,
    },
  },
});

module.exports = { Product };

/**
 * instanceMethods
 */
 Product.prototype.decrementInventory = function (numPurchased) {
  this.quantity = numPurchased = Math.max(this.quantity - numPurchased, 0);
}

Product.prototype.incrementInventory = function (numCanceled) {
  this.quantity = Math.max(this.quantity + numCanceled, 0);
}

/**
 * classMethods
 */
Product.updateInventory = async function (purchasedProducts) {
  for (let i = 0; i < purchasedProducts.length; i++) {
    let purchasedProduct = purchasedProducts[i];
    await purchasedProduct.update({
      quantity: purchasedProduct.quantity - purchasedProduct.cart.cartQuantity,
    });
  }
};


/**
 * Sequelize helper functions
 */

// const filterByCategory = ({ categories }) => {
//   if (categories) {
//     categories = categories.split("|")
//     return {
//       where: {
//         catego
//       }
//     }
//   }
// }
