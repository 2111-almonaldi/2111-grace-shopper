"use strict";
const { generateMovies } = require("./generateMovies");
const { generateUsers } = require("./generateUsers");
const { generateOrders } = require("./generateOrders");
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
  console.log(`seeded ${categories.length} categories`);

  // Creating Users ** Create one admin, one signup, one login => await create user!!!
  const dataUsers = generateUsers();
  const users = await User.bulkCreate(dataUsers);
  console.log(`seeded ${users.length} users`);


  // Create Orders => At least one order per User

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let num = Math.floor(Math.random() * users.length)
     // ordersInCartOnly
     if (num % 2) {

      let orderCreated = {status: "CREATED"}

      // Create Associations: Products &&  Orders
      let productsCreated = [];

      let numCreated = Math.floor(Math.random() * (products.length + 1));
      let pIdxCreated = Math.floor(Math.random() * products.length);

      while (numCreated > 0 ) {
        let orderProduct = products[pIdxCreated];
        productsCreated.push(orderProduct);
        numCreated--;

      }

      orderCreated = { ...orderCreated, productsCreated };
      const order = await Order.create(orderCreated)
      await user.setOrders([order]);
      await order.setProducts(productsCreated);



    } else {
        // create new order for empty cart
        let orderCreated = {status: "CREATED"}
        let orderProcessed = {status: "PROCESSING"}


        // Create Associations: Products &&  Orders
        let productsProcessed = [];
        let numProcessed = Math.floor(Math.random() * (products.length + 1));
        let pIdxProcessed = Math.floor(Math.random() * products.length)

        while (numProcessed > 0) {
          let orderProduct = products[pIdxProcessed]
          productsProcessed.push(orderProduct)
          numProcessed--
        }

        let customerEmail = user.email;
        let customerName = user.fullName;
        let customerAddress = faker.address.streetAddress();
        let customerCity = faker.address.city();
        let customerState = faker.address.state();
        let customerZip = faker.address.zipCode(5);
        let customerPhone = String(faker.phone.phoneNumber(9));
        let orderNumber = faker.finance.mask(6, false, false)

        // use spread operator to insert new key/value pairs into current userOrder: orderProcessed
        orderProcessed = {...orderProcessed, productsProcessed, customerName, customerEmail, customerAddress, customerCity, customerState, customerZip, customerPhone, orderNumber }
        const order = await Order.create(orderCreated);
        const orderHistory = await Order.create(orderProcessed);
        await user.setOrders([order, orderHistory]);
        await order.setProducts(productsProcessed)
    }

  }

  // half of users have items in their cart but have not checkout out yet -> this allows us to test for cart persistence when user login/logout and completes the purchase lifecycle
  const ordersInCart = users.map(user => user.getOrders({where: {status: "CREATED"}}))
  const ordersInProcess = users.map(user => user.getOrders({where: {status: "PROCESSING"}}))
  const orders = users.map(user => user.getOrders());

  // confirming order distribution
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${ordersInProcess.length} orders with status "PROCESSING"`)
  console.log(`seeded ${ordersInCart.length} orders with status "CREATED"`)

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
