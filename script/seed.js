"use strict";
const { generateMovies } = require("./generateMovies");
const { generateUsers } = require("./generateUsers");
const faker = require("faker");

const {
  db,
  models: { Order, Product, ProductCategory, User },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Products
  const dataProducts = generateMovies();
  const products = await Product.bulkCreate(dataProducts);
  console.log(`seeded ${products.length} products`);

  // Create Categories
  const dataCategories = [
    { name: "Comedy" },
    { name: "Fantasy" },
    { name: "Crime" },
    { name: "Drama" },
    { name: "Music" },
    { name: "Adventure" },
    { name: "History" },
    { name: "Thriller" },
    { name: "Animation" },
    { name: "Family" },
    { name: "Mystery" },
    { name: "Biography" },
    { name: "Action" },
    { name: "Film-Noir" },
    { name: "Romance" },
    { name: "Sci-Fi" },
    { name: "War" },
    { name: "Western" },
    { name: "Horror" },
    { name: "Musical" },
    { name: "Sport" },
  ];
  const categories = await ProductCategory.bulkCreate(dataCategories);
  // CARLY NOTE: is this enough ??
  // add function that iterates trough all the product objects, selects the "categories" array, filters by each category, and pushes that object into the appropriate cat?
  console.log(`seeded ${categories.length} categories`);

  // Creating Users ** Create one admin, one signup, one login => await create user!!!
  const dataUsers = generateUsers();
  const users = await User.bulkCreate(dataUsers);
  console.log(`seeded ${users.length} users`);

  // Create Orders - Random 50/50 split with orders
  const dataOrders = [];
  for (let i = 0; i < users.length; i++) {
    let num = Math.floor(Math.random() * (users.length + 1))
    if (num % 2) {
      const order = await Order.create({status: "CREATED"})
      dataOrders.push(order)
      await order.setUser(users[i])
    } else {
      const order = await Order.create({status: "PROCESSING"})
      dataOrders.push(order)
      await order.setUser(users[i])
    }

    // Create Associations: Products &&  Users
    let productArr = [];

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let userOrder = await user.getOrders();
      let num = Math.floor(Math.random() * (products.length + 1));
      let pIdx = Math.floor(Math.random() * products.length);

      while (num <= products.length) {
        let orderProduct = products[pIdx];
        productArr.push(orderProduct);
        num += 1;
      }
      // we assign a random number of products and random assortment of items to each userOrder => simulation of consumer behavior improves external validity of our engineering
      // user order now has two key value pairs:
      userOrder = { ...userOrder, productArr };

  }
  // Define Orders in Cart vs Orders Purchased (Order History)
  // half of users already completed purchase and therefore have order history
  const ordersCheckout = dataOrders.filter(order => order.status === "PROCESSING")

  // half of users have items in their cart but have not checkout out yet -> this allows us to test for cart persistence when user login/logout and completes the purchase lifecycle
  const ordersInCartOnly = dataOrders.filter(order => order.status === "CREATED")




   // confirming order distribution
   console.log(`seeded ${dataOrders.length} orde vcvnm   nmvgkbcxdvb mhgfrwedcvb rs`)
   console.log(`seeded ${ordersCheckout.length} orders with status ${ordersCheckout[0].status}`)
   console.log(`seeded ${ordersInCartOnly.length} orders with status ${ordersInCartOnly[0].status}`)




    /**isolate checkout out items and add model features */


    for (let i = 0; i <ordersCheckout.length; i++) {
      let userOrder = ordersCheckout[i];
      // magic method
      let user = await userOrder.getUser()
      let customerEmail = user.email;
      let customerName = user.name;
      let customerAddress = faker.address.streetAddress();
      let customerCity = faker.address.city();
      let customerState = faker.address.state();
      let customerZip = faker.address.zipCode();
      let customerPhone = faker.phone.phoneNumber();
      let orderNumber = faker.number.digits(6)

      // use spread operator to insert new key/value pairs into current userOrder
      userOrder = {...userOrder, customerName, customerEmail, customerAddress, customerCity, customerState, customerZip, customerPhone, orderNumber }

    }

    // force create for two users [0][1]
  }

  //

  console.log(`Nicole (admin) order: ${users[0].userOrder}`);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
    // await dbpg.query("CREATE EXTENSION pg_trgm");
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
