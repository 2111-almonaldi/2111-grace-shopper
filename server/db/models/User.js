const Sequelize = require("sequelize");
const { STRING, VIRTUAL, BOOLEAN } = Sequelize;
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { Order } = require("./Order")
const { Product } = require("./Product")

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: STRING,
    unique: true,
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
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id, username: this.username }, process.env.JWT);
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
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "Unable to find user";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

// Lookup user by email: If no user, create a user -> Look up order history!
User.lookupByEmail =  async function ({ customerName, customerEmail}) {
  try {
    const order = await Order.findOne({
      where: {
        status: "PROCESSING",
        customerEmail: customerEmail,
        customerName: customerName
      }
    });
    if (!order.userId) {
      const guestUser = await User.create({
        firstName: customerName.split(' ')[0],
        lastName: customerName.split(' ')[1],
        email: customerEmail,
        username: "Guest",
        password: "N/A",
        fullName: customerName,
        isAdmin: false
      })

    return guestUser;
    }
  } catch (err) {
    const error = new Error("Email is not a valid Email Address")
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

const guestEmailToLowerCase = async (guestUser) => {
  if (guestUser.username === "Guest") {
    guestUser.username = guestUser.username.toLowerCase();
  }

}

const guestNameToProperCase = async (guestUser) => {
  if (guestUser.username === "Guest") {
    guestUser.firstName === guestUser.firstName[0].toUpperCase();
    guestUser.lastName === guestUser.lastName[0].toUpperCase();
    guestUser.fullName === guestUser.firstName + " " + guestUser.lastName;
  }
}

const usernameToLowerCase = async (user) => {
  if (user.changed("username")) {
    user.username = user.username.toLowerCase();
  }
}

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

User.beforeUpdate(emailToLowerCase);
User.beforeBulkCreate((users) => Promise.all(users.map(emailToLowerCase)));


User.beforeUpdate(usernameToLowerCase)
User.beforeBulkCreate((users) => Promise.all(users.map(usernameToLowerCase)));

User.beforeCreate(guestNameToProperCase)
User.beforeBulkCreate((users) => Promise.all(users.map(guestNameToProperCase)));


User.beforeCreate(guestNameToProperCase)
User.beforeBulkCreate((users) => Promise.all(users.map(guestNameToProperCase)));


User.beforeCreate(guestEmailToLowerCase)
User.beforeBulkCreate((users) => Promise.all(users.map(guestEmailToLowerCase)));

