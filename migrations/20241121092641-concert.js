"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("concerts", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      artist: Sequelize.STRING,
      venue: Sequelize.STRING,
      city: Sequelize.STRING,
      date: Sequelize.DATE,
      ticketPrice: Sequelize.FLOAT,
      seatCategory: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("concerts");
  },
};
