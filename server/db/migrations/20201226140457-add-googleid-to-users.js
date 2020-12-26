'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'googleId',
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Users',
      'googleId'
    );
  }
};
