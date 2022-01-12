const faker = require('faker');


function generateUsers() {

  let users = []

  for (let id=1; id <= 100; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(fullName);
    let fullName = firstName + ' ' + lastName
    let username = faker.internet.username(fullName)
    let password = faker.internet.password()
    let isAdmin = Math.floor(Math.random() * 10) > 8

    users.push({
        id,
        email,
        username,
        password,
        firstName,
        lastName,
        isAdmin

    });
  }

  return users
}

module.exports = { generateUsers}




