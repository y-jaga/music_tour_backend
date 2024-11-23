'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('afterParties', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      location: Sequelize.STRING,
      city: Sequelize.STRING,
      date: Sequelize.DATE,
      ticketPrice: Sequelize.FLOAT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('afterParties');
  }
};
