const { models: { User } } = require("../db")


const requireCookieToken = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      req.user = await User.findByToken(token)
      next()
    } else {
      throw new Error('Error while authentication');
    }
  } catch (err) {
    res.status(400).send({ auth_error: 'Authentication failed' })
    console.log(err)
    next(err)
  }
}

// check if user is an admin
const userIsAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    throw { status: 403, message: "User is not an admin!"}
  }
}

module.exports = {
  requireCookieToken,
  userIsAdmin
}
