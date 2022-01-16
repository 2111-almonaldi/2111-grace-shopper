const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { STRING, INTEGER, TEXT, DECIMAL, ARRAY } = Sequelize;
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
    defaultValue:
      "https://media.istockphoto.com/vectors/coming-soon-lettering-coming-soon-for-promotion-advertisement-sale-vector-id1221240925?k=20&m=1221240925&s=612x612&w=0&h=HX77CIwJ34u7qUMpI_W5z4dDnEbHGv66mGXVTpIccv8=",
    validate: {
      isUrl: true,
    },
  },
  price: {
    type: DECIMAL,
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
