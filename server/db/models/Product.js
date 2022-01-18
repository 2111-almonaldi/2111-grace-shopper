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
<<<<<<< HEAD
    defaultValue: "/images/defaultProduct.jpg",
=======
    defaultValue:
      "https://media.istockphoto.com/vectors/coming-soon-lettering-coming-soon-for-promotion-advertisement-sale-vector-id1221240925?k=20&m=1221240925&s=612x612&w=0&h=HX77CIwJ34u7qUMpI_W5z4dDnEbHGv66mGXVTpIccv8=",
>>>>>>> main
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
