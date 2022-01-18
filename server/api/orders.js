const router = require("express").Router();
const { models: { User, Order, Product } } = require("../db");
const { requireToken, isAdmin } = require("../gateKeepingMiddleware");

//GET /orders - returns list of userOrders with products

