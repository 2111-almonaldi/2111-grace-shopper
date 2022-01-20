const router = require('express').Router();
const {
	models: { User, Order, Product },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
const {
	orderHistoryFilter,
	paginate,
	orderSort,
	orderStatusFilter
} = require('../db/models/User');
const { userSort } = require('../db/models/User');
const  DEFAULT_PAGE_SIZE = 10;

router.use(requireToken, isAdmin, (req, res, next) => {
	next();
});

module.exports = router;
// GET /api/admin/users
router.get('/users', async (req, res, next) => {
	try {
		const { rows: users, count: totalUsers } = await User.findAndCountAll({
			attributes: [
				'id',
				'username',
				'email',
				'firstName',
				'lastName',
        'FullName',
				'isAdmin',
			],
			...userSort(req.query),
			...paginate(req.query, DEFAULT_PAGE_SIZE ),
			distinct: true,
		});
		res.json({ users, totalUsers });
	} catch (err) {
		next(err);
	}
});

// GET /api/admin/orders
router.get('/orders', async (req, res, next) => {
	try {
		const { rows: orders, count: totalOrders } = await Order.findAndCountAll({
			attributes: ['id', 'status', 'subtotal', 'orderQty', 'orderNumber'],
			include: [
				{
					model: Product,
					as: 'items',
					// fix

				},
			],
      ...orderHistoryFilter(req.query),
      ...orderStatusFilter(req.query),
			...orderSort(req.query),
			...paginate(req.query, DEFAULT_PAGE_SIZE),
			// ...orderSearch('order', 'orderNumber', req.query),
			distinct: true,
		});
		res.json({ orders, totalOrders });
	} catch (err) {
		next(err);
	}
});

// PUT /api/admin/orders/:id
router.put("orders/:id", async (req, res, next) => {
  try {
    const {status, subTotal, orderQty, orderNumber, customerEmail, customerName, customerAddress, customerCity, customerState, customerZip } = req.body;
    const [rowsUpdated, orders] = await Product.update(
      {status, subTotal, orderQty, orderNumber, customerEmail, customerName, customerAddress, customerCity, customerState, customerZip},
      {
        where: {
          id: req.params.id
        },
        returning: true,
        include: {
          models: Product
        }
      }
    )
    if (rowsUpdated) {
      res.json(orders[0])
    } else {
      throw { status: 401, message: "Order Not Found"}
    }
  } catch (err) {
    next(err)
  }
})
// GET /api/admin/products
router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "imageUrl", "quantity"]
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/products
router.post('/products', async (req, res, next) => {
	try {
		const { name, price, imageUrl, quantity, description } = req.body;
		const product = await Product.create({
			name,
			price,
			imageUrl,
			quantity,
			description,
		});
		res.json(product);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', async (req, res, next) => {
	try {
		const rowsDeleted = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (rowsDeleted) {
			res.sendStatus(200);
		} else {
			throw { status: 401, message: 'Product Not Found!' };
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// PUT /api/admin/products/:id
router.put('/products/:id', async (req, res, next) => {
	try {
		const { name, price, imageUrl, quantity, description } = req.body;
		const [rowsUpdated, products] = await Product.update(
			{ name, price, imageUrl, quantity, description },
			{
				where: {
					id: req.params.id,
				},
				returning: true,
			}
		);
		if (rowsUpdated) {
			res.json(products[0]);
		} else {
			throw { status: 401, message: 'Product Not Found!' };
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//PUT /api/admin/users/:id - update a user with the given id
router.put('/users/:id', async (req, res, next) => {
	try {
		const { firstName, lastName, username, email, isAdmin } = req.body;
		const user = await User.findByPk(req.params.id);
		if (user) {
			await user.update(
				{ firstName, lastName, email, isAdmin, username },
				{
					attributes: ['firstName', 'lastName', 'email', 'isAdmin', 'username'],
				}
			);
			res.json(user);
		} else {
			throw { status: 401, message: 'User Not Found!' };
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//DELETE /api/admin/users/:id

router.delete('/users/:id', async (req, res, next) => {
	try {
		const rowsDeleted = await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (rowsDeleted) {
			res.sendStatus(200);
		} else {
			throw { status: 401, message: 'User Not Found!' };
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});


router.get("/me", async (req, res, next) => {
  try {
    res.send({ loggedIn: true, firstName: req.user.firstName, lastName: req.user.lastName, username: req.user.username, email: req.user.email, isAdmin: req.user.isAdmin  });
  } catch (ex) {
    next(ex);
  }
});
