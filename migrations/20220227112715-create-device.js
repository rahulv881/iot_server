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
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      cell1: {
        type: Sequelize.FLOAT
      },
      cell2: {
        type: Sequelize.FLOAT
      },
      cell3: {
        type: Sequelize.FLOAT
      },
      cell4: {
        type: Sequelize.FLOAT
      },
      cell5: {
        type: Sequelize.FLOAT
      },
      cell6: {
        type: Sequelize.FLOAT
      },
      cell7: {
        type: Sequelize.FLOAT
      },
      cell8: {
        type: Sequelize.FLOAT
      },
      cell9: {
        type: Sequelize.FLOAT
      },
      cell10: {
        type: Sequelize.FLOAT
      },
      cell11: {
        type: Sequelize.FLOAT
      },
      cell12: {
        type: Sequelize.FLOAT
      },
      cell13: {
        type: Sequelize.FLOAT
      },
      cell14: {
        type: Sequelize.FLOAT
      },
      avgcellvoltage: {
        type: Sequelize.FLOAT
      },
      packvoltage: {
        type: Sequelize.FLOAT
      },
      current: {
        type: Sequelize.FLOAT
      },
      batterypercent: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};