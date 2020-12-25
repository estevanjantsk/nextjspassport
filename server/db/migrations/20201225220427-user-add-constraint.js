'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'unique',
      name: 'unique_username'
    });
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Users',
      'unique_username');
    await queryInterface.removeConstraint(
      'Users',
      'unique_email');
  }
};
