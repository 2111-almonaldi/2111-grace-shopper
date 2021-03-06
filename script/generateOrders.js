const {generateUsers} = require('./generateUsers')
const {generateMovies} = require('./generateMovies')
const { models: {User, Product, Order, Category }} = require("../server/db")

// magic methods for these models


const generateOrders = () => {
  const orders = [
  {status: "CREATED", items: []},
  {status: "PROCESSING", items: []},
  {status: "FULFILLED", items: []},
  {status: "CANCELLED", items: []}
  ]


  const users = generateUsers()
  for (let i = 0; i < users.length; i++) {
  const users.map(user => user.createOrder({where: {status: ""}}))



  return orders

}

module.exports = { generateOrders }
