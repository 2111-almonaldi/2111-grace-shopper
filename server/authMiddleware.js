const { models: { User } } = require("./db")


const requireToken = async (req, res, next) => {
  try {
    if (req.signedCookies && req.signedCookies.token) {
      req.user = await User.findByToken(req.signedCookies.token)
      next()
    } else {
      throw { status: 401, message: "Missing Token!" }
    }
  } catch (err) {
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
  requireToken,
  userIsAdmin
}
