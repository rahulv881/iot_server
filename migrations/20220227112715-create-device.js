'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vid: {
        type: Sequelize.STRING,
        unique: true
      },
      datavia: {
        type: Sequelize.STRING
      },
      imei: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      cell1: {
        type: Sequelize.STRING
      },
      cell2: {
        type: Sequelize.STRING
      },
      cell3: {
        type: Sequelize.STRING
      },
      cell4: {
        type: Sequelize.STRING
      },
      cell5: {
        type: Sequelize.STRING
      },
      cell6: {
        type: Sequelize.STRING
      },
      cell7: {
        type: Sequelize.STRING
      },
      cell8: {
        type: Sequelize.STRING
      },
      cell9: {
        type: Sequelize.STRING
      },
      cell10: {
        type: Sequelize.STRING
      },
      cell11: {
        type: Sequelize.STRING
      },
      cell12: {
        type: Sequelize.STRING
      },
      cell13: {
        type: Sequelize.STRING
      },
      cell14: {
        type: Sequelize.STRING
      },
      avgcellvoltage: {
        type: Sequelize.STRING
      },
      packvoltage: {
        type: Sequelize.STRING
      },
      current: {
        type: Sequelize.STRING
      },
      batterypercent: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};