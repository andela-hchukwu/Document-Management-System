const faker = require('faker');


module.exports = {
  testRole: {
    title: 'admin'
  },

  testUser: {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  testDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  }
};
