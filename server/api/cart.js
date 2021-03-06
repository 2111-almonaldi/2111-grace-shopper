const router = require("express").Router();
const {
  models: { Order }
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    const cart = await Order.findOne({
      where: {
        userId: id,
      },
      include: [{ model: Order }],
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
