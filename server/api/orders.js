const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
const {
  orderHistoryFilter,
  paginate,
  orderSort,
  orderSearch,
} = require("../db/models/User");

module.exports = router;

//GET /orders - returns list of userOrders with products
router.get("/", requireToken, async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      include: {
        model: Product,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET api/orders/:id
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Product,
      },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET api/orders/:id
router.get("/:status", requireToken, async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      where: {
        status: req.params.status,
      },
      include: {
        model: Product,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET api/orders/:id/items
router.get("/:id/items", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    const items = order.getUserItems();
    if (items.length) res.json(items);
    else throw new Error("No Items Found in Order. Keep Shopping!");
  } catch (err) {
    next(err);
  }
});

// GET api/orders/:id/confirmation
router.get("/:id/confirmation", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      where: { status: "PROCESSING" },
      include: {
        model: Product,
      },
    });
    const confirmation = "Your order is confirmed!";
    res.send({ order, confirmation });
  } catch (err) {
    err.message = "Payment Failed. Please try again.";
    console.error(err.message);
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.send(await order.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/pending", async (req, res, next) => {
  try {
    /*// if my token id is 1, and my api request is
    // /api/orders/2/pending
    // it should fail
    if (req.user.id !== req.params.id) {
      throw new Error("Unauthorized");
    }*/
    const pendingOrders = await Order.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.send(pendingOrders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
