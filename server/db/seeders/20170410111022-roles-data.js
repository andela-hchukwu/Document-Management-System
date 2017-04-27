module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      title: 'admin',
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }, {
      title: 'regular',
      createdAt: '2017-03-31 13:51:40.653+01',
      updatedAt: '2017-03-31 13:51:40.653+01'
    }], {});
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
