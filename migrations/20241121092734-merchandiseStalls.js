'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('merchandiseStalls', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      stallName: Sequelize.STRING,
      itemAvailable: Sequelize.STRING,
      price: Sequelize.FLOAT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('merchandiseStalls');
  }
};
