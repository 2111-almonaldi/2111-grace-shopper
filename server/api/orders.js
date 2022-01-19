const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
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
