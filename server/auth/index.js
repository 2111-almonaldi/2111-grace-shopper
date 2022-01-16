const router = require("express").Router();
const { models: { User } } = require("../db");
const { requireCookieToken } = require("../middleware/authMiddleware")
const cookieParser = require("cookie-parser");
const { cookieSecret, jwtSecret } = require('../config')

console.log(`Cookie Secret: ${cookieSecret}`);
console.log(`JWT Secret: ${jwtSecret}`)
router.use(cookieParser(cookieSecret));

router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, email} = req.body;

    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      password,
    });


    const receivedFields = Object.keys(req.body)
    const validFields = ["firstName", "lastName", "username", "password", "email"]
    const isInvalidField = await User.isInvalidField(receivedFields, validFields)
    if (isInvalidField) return res.status(400).send({ signup_error: 'Invalid Field'})

    const result = await req.query([username]);
    const count = result.rows[0].count
    if (count > 0) {
      return res.status(400).send({ signup_error: 'User with this email already exists'})
    }


    await user.createOrder();
    console.log(token);




    // res.cookie("token", token, {
    //   sameSite: "strict",
    //   httpOnly: true,
    //   signed: true,
    //   maxAge: (30 * 24 * 60 * 60),
    //   path: "/signup"
    // })
    // res.send({
    //   loggedIn: true,
    //   firstName: user.firstName,
    //   isAdmin: user.isAdmin,
    //   username: user.username,
    //   email: user.email,
    //   lastName: user.lastName
    // })
    res.send({ token: await user.generateToken() });
    console.log(token)
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await User.authenticate({ username, password});
    // check that the user exists
    if (!user) {
      res.status(400).send({ signin_error: 'User not found' })

    // check that current password is correct
    } else if (!user.correctPassword(req.body.password)) {
      res.status(400).send({ signin_error: 'Invalid password' })
    }
    else {
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
        maxAge: (30 * 24 * 60 * 60),
        path: "/"
      })

      res.send({
        loggedIn: true,
        firstName: user.firstName,
        isAdmin: user.isAdmin,
        username: user.username,
        email: user.email,
        lastName: user.lastName
      });
      console.log(user.isAdmin)
    }

  } catch (err) {
    next(err);
  }
});


// see of current password is correct
router.post("/change", requireCookieToken, async (req, res, next) => {
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

// admin stuff: make sure isAdmin is sent also
router.get("/me", requireCookieToken, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, isAdmin} = req.user
    res.send({ loggedIn: true, firstName, lastName, username, email, isAdmin })
  } catch (ex) {
    next(ex);
  }
});

router.get("/info", requireCookieToken, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email} = req.user
    res.send({ user: { firstName, lastName, username, email}})
  } catch (ex) {
    next(ex);
  }
})

router.put("/update", requireCookieToken, async (req, res, next) => {
  try {
    const { firstName, lastName, username, email} = req.body

    await req.user.update({ firstName, lastName, username, email })
    const receivedFields = Object.keys(req.body)
    const validFields = ["firstName", "lastName", "username", "email"]
    const isInvalidField = await req.user.isInvalidField(receivedFields, validFields)
    if (isInvalidField) return res.status(400).send({ update_error: 'Invalid Field'})

    res.send({ user: { firstName, lastName, username, email} })
  } catch (ex) {
    next(ex);
  }
})

router.post("/logout", requireCookieToken, async(req, res, next) => {
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
