const path = require("path")
const express = require("express")
const morgan = require("morgan")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")


// (csrf) cross-site-request forgery : protecting persistent cookies w/ boilerplate configs
const csurf = require("csurf")
const csrfProtection = csurf({ cookie: { httpOnly: true }})

module.exports = app

// logging middleware
app.use(morgan("dev"))



// auth and api routes
app.use("/auth", require("./auth"))
app.use("/api", require("./api"))

app.get("/", (req, res)=> res.sendFile(path.join(__dirname, "..", "public/index.html")));

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())

// // cookie parsing middleware
app.use(cookieParser())


app.get("/csrf-token", csrfProtection, (req, res) => {

  res.json('send', {csrfToken: req.csrfToken()})

  // cookies that have not been signed
  console.log("Cookies: ", req.cookies)

  // cookies that have been signed
  console.log("Cookies: ", req.signedCookies)

  // csrfToken
  console.log("csrfToken: ", req.csrfToken())

  }
)




// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(express.urlencoded({ extended: true }))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found")
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})
