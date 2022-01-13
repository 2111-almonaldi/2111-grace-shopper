const express = require("express");
const router = express.Router();
const {
  models: { Product },
} = require("../db");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    if (singleProduct) res.json(singleProduct);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
