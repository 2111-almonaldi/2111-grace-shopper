const Sequelize = require("sequelize");
const { STRING, VIRTUAL, TEXT} = Sequelize
const db = require("../db");

const ProductCategory = db.define('productCategory', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },

  categoryCode: {
    type: VIRTUAL,
    get() {
      return this.name.slice(0, 4) + '01'
    }
  }

})

module.exports = {ProductCategory}

