const router = require("express").Router();
const { models: { User, Order, Product } } = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");
const {orderHistoryFilter, paginate, orderSort, orderSearch } = require("../db/models/User")
const {userSort} = require("../db/models/User")

router.use(requireToken, isAdmin, (req, res, next) => {
  next();
});

module.exports = router;
// GET /api/admin/users
router.get("/users", async (req, res, next) => {
  try {
    const { rows: users, count: totalUsers} = await User.findAndCountAll({
      attributes: ["id", "username", "email", "firstName", "lastName", "isAdmin"],
      ...userSort(req.query),
      ...paginate(req.query, 20),
      distinct: true
    })
    res.json({ users, totalUsers})
  } catch (err) {
    next (err)
  }
})

// GET /api/admin/orders
router.get("/orders", requireToken, isAdmin, async (req, res, next) => {
  try {
    const { rows: orders, count: totalOrders } = await Order.findAndCountAll({
      attributes: ["id", "status", "subtotal", "orderQty", "orderNumber"],
      include: [
        {
          model: Product,
          as: "items",
          // fix
          ...orderHistoryFilter(req.query)
        }
      ],
      ...orderSort(req.query),
      ...paginate(req.query, 5),
      ...orderSearch("order", "orderNumber", req.query),
      distinct: true
    })
    res.json({orders, totalOrders});
  } catch (err) {
    next(err);
  }
});


// POST /api/admin/products
router.post("/products", async (req, res, next) => {
  try {

    const { name, price, imageUrl, quantity, description } = req.body;
    const product = await Product.create({ name, price, imageUrl, quantity, description });
    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// DELETE /api/admin/products
router.delete("/products/:id", async (req, res, next) => {
  try {
    const rowsDeleted = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (rowsDeleted) {
      res.sendStatus(200);
    } else {
      throw { status: 401, message: "Product Not Found!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});


// PUT /api/admin/products
router.put("/products/:id", async (req, res, next) => {
  try {

    const { name, price, imageUrl, quantity, description } = req.body;
    const [rowsUpdated, products] = await Product.update(
      { name, price, imageUrl, quantity, description },
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
    );
    if (rowsUpdated) {
      res.json(products[0]);
    } else {
      throw { status: 401, message: "Product Not Found!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//PUT /api/admin/users/:id - update a user with the given id
router.put("/users/:id", async (req, res, next) => {
  try {


    const { firstName, lastName, username, email, isAdmin } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(
        { firstName, lastName, email, isAdmin, username },
        {
          attributes: ["firstName", "lastName", "email", "isAdmin", "username"]
        }
      );
      res.json(user);
    } else {
      throw { status: 401, message: "User Not Found!" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
