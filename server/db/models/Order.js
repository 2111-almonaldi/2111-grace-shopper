const Sequelize = require('sequelize')
const { ENUM } = Sequelize
const db = require('../db')
const { Product } = require('./Product')
const { Cart } = require('./Cart')
const { User } = require('./User')

const Order =  db.define('order', {
  status: {
    type: ENUM('PROCESSING', 'FULFILLED'),
    allowNull: false,
    defaultValue: 'PROCESSING'
  }
})


module.exports = {Order};

// Order.checkout = async function(){


// Order.guestCheckout = async function()
