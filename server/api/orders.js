const router = require("express").Router();
const { models: { User, Order, Product } } = require("../db");
const { requireToken, isAdmin } = require("../gateKeepingMiddleware");
const {orderHistoryFilter, paginate, orderSort, orderSearch } = require("../db/models/User")

module.exports = router;

//GET /orders - returns list of userOrders with products
router.get("/", requireToken, async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      include: {
        model: Product
      }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
})




// GET api/orders/:id
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Product
      }
    })
    res.json(order)

  } catch (err) {
    next(err)
  }
})


// GET api/orders/:id
router.get("/:status", requireToken, async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({
      where: {
        status: req.params.status
      },
      include: {
        model: Product
      }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});


// GET api/orders/:id/items
router.get("/:id/items", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const items = order.getUserItems();
    if (items.length) res.json(items); else throw new Error("No Items Found in Order. Keep Shopping!")
  } catch (err) {
    next (err)
  }
});

// GET api/orders/:id/confirmation
router.get("/:id/confirmation", requireToken, async (req, res, next) =>{
  try {
    const order = await Order.findByPk(req.params.id, {
      where: { status: "PROCESSING" },
      include: {
        model: Product
      }
    })
    const confirmation = "Your order is confirmed!"
    res.send({order, confirmation})

  } catch (err) {
    err.message = "Payment Failed. Please try again."
    console.error(err.message)
    next(err)
  }
})


