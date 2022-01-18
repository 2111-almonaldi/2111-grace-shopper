"use strict";
const { generateMovies } = require("./generateMovies");
const { generateUsers } = require("./generateUsers");

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

  // Create Orders
  const orders = await Promise.all([
    Order.create({
      status: "PROCESSING",
      items: [{ name: "L.A. Confidential", count: 1, id: 1, price: 25.0 }],
      customerName: "Nicole DeSantis",
      customerEmail: "nd13@gmail.com",
      customerAddress: "1385 York Ave, New York, NY 10021",
      customerPhone: "845-249-8407",
      userId: 1,
    }),
    Order.create({
      status: "FULFILLED",
      items: [{ name: "The Last Samurai", count: 2, id: 2, price: 96.0 }],
      subtotal: 47,
      customerName: "Nicole DeSantis",
      customerEmail: "nd13@gmail.com",
      customerAddress: "1385 York Ave, New York, NY 10021",
      customerPhone: "845-249-8407",
      userId: 1,
    }),
    Order.create({
      status: "CREATED",
      items: [],
      subtotal: 52,
      customerName: "Nicole DeSantis",
      customerEmail: "nd13@gmail.com",
      customerAddress: "1385 York Ave, New York, NY 10021",
      customerPhone: "845-249-8407",
      userId: 1,
    }),
    Order.create({
      status: "PROCESSING",
      items: [],
      subtotal: 60,
      customerName: "Brendan Kennedy",
      customerEmail: "bk35@gmail.com",
      customerAddress: "1385 York Ave, New York, NY 10021",
      customerPhone: "845-236-3620",
      userId: 2,
    }),
    Order.create({
      status: "FULFILLED",
      items: [],
      subtotal: 78,
      customerName: "Brendan Kennedy",
      customerEmail: "bk35@gmail.com",
      customerAddress: "1385 York Ave, New York, NY 10021",
      customerPhone: "845-236-3620",
      userId: 2,
    }),
  ]);

  console.log(`seeded ${orders.length} orders`);

  /*
  for (let i = 3; i < users.length; i++) {
    let uIdx = Math.floor(Math.random() * users.length);
    let num = Math.floor(Math.random() * (users.length + 1));
    if (num % 2) {
      const order = await Order.create({ status: "CREATED" });
      dataOrders.push(order);
      await order.setUser(users[i]);
    } else {
      const order = await Order.create({ status: "PROCESSING" });
      dataOrders.push(order);
      await order.setUser(users[i]);
    }
  }
  const orderCheckedout = dataOrders.filter(
    (order) => order.status === "PROCESSING"
  );
  const orderInCartOnly = dataOrders.filter(
    (order) => order.status === "CREATED"
  );
  console.log(`seeded ${dataOrders.length} orders`);
  console.log(
    `seeded ${orderCheckedout.length} orders with status ${orderCheckedout[0].status}`
  );
  console.log(
    `seeded ${orderInCartOnly.length} orders with status ${orderInCartOnly[0].status}`
  );
  */

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
    userOrder = { ...userOrder, productArr };
  }

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
