const { User } = require('../db/models/User');

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await User.findByToken(token);

		req.user = user;
	} catch (err) {
		next(err);
	}
};

const isAdmin = async (req, res, next) => {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).send('User is not an admin!');
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	requireToken,
	isAdmin,
};
