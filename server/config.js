const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  cookieSecret: process.env.COOKIE_SECRET,
  jwtSecret: process.env.JWT

}
