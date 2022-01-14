const Sequelize = require("sequelize");
const { STRING, VIRTUAL, BOOLEAN } = Sequelize;
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken")
const { jwtSecret } = require("../../config");
// const { user } = require("pg/lib/defaults");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: STRING,
    //   unique: true,
    allowNull: false,
  },
  password: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
       allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: true,
  },
  fullName: {
    type: VIRTUAL,
    get() {
      return this.firstName + " " + this.lastName;
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { User };

/**
 * customErrors
 */
class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError"
  }
}

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, jwtSecret);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  const token = await user.generateToken()
  return { user, token }
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, jwtSecret);
    const user = User.findByPk(id);
    if (!user) {
      throw new UserNotFoundError("Unable to find user")
    }
    return user;
  } catch (ex) {
    if (ex instanceof JsonWebTokenError){
      console.log(ex)
    } else if (ex instanceof TokenExpiredError) {
      console.log(ex)
    } else {
      console.log(ex)
      ex.status = 401
    }
    throw ex;
  }
};

// Lookup user by email: If no user, create a user -> Look up order history!

User.lookupByEmail = async function ({ firstName, lastName, username, email, password }) {
  try {
    let user = await User.findOne({
      where: {
      username: username
      }
    });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        username,
        password

      })
    }
    return user
  } catch (ex) {
    const error = Error('Username or Email is not valid')
    error.status = 401
    throw error
  }
}


/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

const emailToLowerCase = async (user) => {
  if (user.changed("email")) {
    user.email = user.email.toLowerCase();
  }
};

const usernameToLowerCase = async (user) => {
  if (user.changed("username")) {
    user.username = user.username.toLowerCase();
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

User.beforeUpdate(emailToLowerCase);
User.beforeBulkCreate((users) => Promise.all(users.map(emailToLowerCase)));

User.beforeUpdate(usernameToLowerCase);
User.beforeBulkCreate((users) => Promise.all(users.map(usernameToLowerCase)))
