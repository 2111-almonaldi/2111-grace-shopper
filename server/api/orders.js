const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
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

module.exports = router;
