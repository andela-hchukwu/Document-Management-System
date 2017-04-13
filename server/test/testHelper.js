const faker = require('faker');


module.exports = {
  testRole: {
    title: 'admin'
  },

  adminRole: {
    id: 1,
    title: 'admin'
  },

  regularRole: {
    id: 2,
    title: 'regular'
  },

  testUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  regularUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  firstUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  secondUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  adminUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  usersArray() {
    const users = [];
    for (let i = 0; i <= 10; i += 1) {
      users.push({
        userName: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    }
    return users;
  },

  testDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  }
};
