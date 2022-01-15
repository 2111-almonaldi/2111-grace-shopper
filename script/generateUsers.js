const faker = require("faker");

function generateUsers() {
  let users = [
    {
      username: "nicole_desantis",
      password: "123",
      email: "nd13@gmail.com",
      firstName: "Nicole",
      lastName: "DeSantis",
      fullName: "Nicole DeSantis",
      isAdmin: "t",
    },
    {
      username: "brendan_kennedy",
      password: "456",
      email: "bk35@gmail.com",
      firstName: "Brendan",
      lastName: "Kennedy",
      fullName: "Brendan Kennedy",
      isAdmin: "f",
    },
  ];

  for (let id = 1; id <= 100; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName);
    let fullName = firstName + " " + lastName;
    let username = (firstName + "_" + lastName).toLowerCase();
    let password = faker.internet.password();
    let isAdmin = Math.floor(Math.random() * 10) > 8;

    users.push({
      username,
      password,
      email,
      firstName,
      lastName,
      fullName,
      isAdmin,
    });
  }

  return users;
}

module.exports = { generateUsers };
