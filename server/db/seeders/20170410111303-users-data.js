const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        userName: 'eloka',
        firstName: 'Henry',
        lastName: 'Chukwu',
        email: 'henrychukwu13@gmail.com',
        password: bcrypt.hashSync('1234567890', bcrypt.genSaltSync(8)),
        roleId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'nedu',
        firstName: 'chinedu',
        lastName: 'ofor',
        email: 'neduofor@gmail.com',
        password: bcrypt.hashSync('1234567890', bcrypt.genSaltSync(8)),
        roleId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
