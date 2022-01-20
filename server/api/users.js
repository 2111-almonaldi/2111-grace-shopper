const router = require('express').Router();
const {
	models: { User, Order },
} = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

// GET /api/users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ['id', 'username', 'email', 'fullName', 'isAdmin'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

// GET /api/users/:id
router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
	try {
		const user = await User.findAll({
			where: {
				id: req.params.id,
			},
			attributes: [
				'id',
				'username',
				'email',
				'firstName',
				'lastName',
				'fullName',
				'isAdmin',
			],
		});
		res.json(user);
	} catch (error) {
		next(error);
	}
});

// POST /api/users
router.post('/', requireToken, isAdmin, async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(201).send(user);
	} catch (error) {
		next(error);
	}
});

// PUT /api/users/:id
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		res.send(await user.update(req.body));
	} catch (error) {
		next(error);
	}
});

// DELETE /api/users/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.destroy();
		res.send(user);
	} catch (error) {
		next(error);
	}
});

router.get('/:id/pendingcarts', requireToken, async (req, res, next) => {
	try {
		const userCreatedCarts = await Order.findAll({
			where: {
				userId: req.params.id,
				status: 'CREATED',
			},
		});
		res.send(userCreatedCarts);
	} catch (err) {
		next(err);
	}
});
