'use strict'
const {generateMovies} = require('./generateMovies')
const {generateUsers} = require('./generateUsers')

const {db, models: {Cart, Order, Product, ProductCategory, User } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')


  // Creating Products
  const dataProducts = generateMovies();
  const products = await Product.bulkCreate(dataProducts)
  console.log(`seeded ${products.length} products`)

  // Creating Users
  const dataUsers = generateUsers()
  const users = await User.bulkCreate(dataUsers)
  console.log(`seeded ${users.length} users`)

  // Create Categories
  const dataCategories = [
    {name: "Comedy"},
    {name: "Fantasy"},
    {name: "Crime"},
    {name: "Drama"},
    {name: "Music"},
    {name:"Adventure"},
    {name: "History"},
    {name: "Thriller"},
    {name: "Animation"},
    {name: "Family"},
    {name: "Mystery"},
    {name: "Biography"},
    {name: "Action"},
    {name: "Film-Noir"},
    {name: "Romance"},
    {name: "Sci-Fi"},
    {name: "War"},
    {name: "Western"},
    {name: "Horror"},
    {name: "Musical"},
    {name: "Sport"}
  ]
  const categories = await ProductCategory.bulkCreate(dataCategories)
  // CARLY NOTE: is this enough ??
  // add function that iterates trough all the product objects, selects the "categories" array, filters by each category, and pushes that object into the appropriate cat?
  console.log(`seeded ${categories.length} categories`)

  // Create Orders
  const dataOrders = []
  for (let i = 0; i < users.length; i++) {
    const order = await Order.create({status: "PROCESSING"})
    dataOrders.push(order)
    await order.setUser(users[i])
  }
  console.log(`seeded ${dataOrders.length} orders`)



  // Create Associations: Products &&  Users


    for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const userOrder = await user.getOrders();

    let num = 0;
    while (num < (Math.floor(Math.random() * 10))) {
      const pIdx = Math.floor(Math.random() * ((products.length + 1)))
      await userOrder[0].setProducts([...products[pIdx]])
      num++
    }
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
