const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const {
  models: { Product },
} = require("../db");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ attributes: ['name', 'imageUrl', 'description', 'price'] });
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

// POST /api/products
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body)
    const product = await Product.create(req.body);
    console.log(product)
    res.status(201).send(product);
  } catch(err) {
    next(err);
  }
})

// PUT /api/products/:id
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch(err) {
    next(err);
  }
})

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch(err) {
    next(err);
  }
})

module.exports = router;
