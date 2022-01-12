const faker = require('faker');


function generateUsers() {

  let users = []

  for (let id=1; id <= 100; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName);
    let fullName = firstName + ' ' + lastName
    let username = (firstName + '_' + lastName).toLowerCase()
    let password = faker.internet.password()
    let isAdmin = Math.floor(Math.random() * 10) > 8

    users.push({
        id,
        username,
        password,
        email,
        firstName,
        lastName,
        fullName,
        isAdmin

    });
  }

  return users
}

module.exports = { generateUsers}




