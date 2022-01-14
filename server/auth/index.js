const router = require("express").Router();
const { models: { User } } = require("../db");
const { requireToken } = require("../authMiddleware")
const cookieParser = require("cookie-parser");
const { cookieSecret, jwtSecret } = require('../config')

console.log(`Cookie Secret: ${cookieSecret}`);
console.log(`JWT Secret: ${jwtSecret}`)
router.use(cookieParser(cookieSecret));


router.post("/login", async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const { user, token } = await User.authenticate({ username, password});
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true
    })
    // check that the user exists
    if (!user) {
      res.status(401).send('User not found')
    // check that current password is correct
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Invalid password')
    } else {
    res.send({
      loggedIn: true,
      firstName: user.firstName,
      isAdmin: user.isAdmin
    });
    }
  } catch (err) {
    res.status(401).send("Authentication failed")
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, firstName, lastName, password } = req.body;
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password,
    });
    const token = await user.generateToken();
    res.cookie("token", token, {
      sameSite: "strcit",
      httpOnly: true,
      signed: true
    })
    res.send({
      loggedIn: true,
      firstName: user.firstName
    })
    // res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

// see of current password is correct
router.post("/change", requireToken, async (req, res, next) => {
  try {
    if (await req.user.correctPassword(req.body.currentPassword)) {
      await req.user.update({ password: req.body.newPassword });
      res.sendStatus(200)
    } else {
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const { firstName, lastName, username, email} = req.user
    res.send({ loggedIn: true, firstName, lastName, username, email})
  } catch (ex) {
    next(ex);
  }
});

router.get("/info", requireToken, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email} = req.user
    res.send({ user: { firstName, lastName, username, email}})
  } catch (ex) {
    next(ex);
  }
})

router.put("/update", requireToken, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email} = req.body
    await req.user.update({ firstName, lastName, username, email })
    res.send({ user: { firstName, lastName, username, email} })
  } catch (ex) {
    next(ex);
  }
})

router.get("/logout", (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true
    })
    res.json({
      loggedIn: false
    })
  } catch (ex) {
    next(ex);
  }
})
module.exports = router;
