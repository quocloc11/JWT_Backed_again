'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('User',
      [
        {
          email: 'John Doe',
          password: '123',
          username: 'fake1'
        },
        {
          email: 'John Doe',
          password: '1234',
          username: 'fake2'
        },
        {
          email: 'John Doe',
          password: '12345',
          username: 'fake3'
        }


      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
