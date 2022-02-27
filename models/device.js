'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Device.init({
    vid: DataTypes.STRING,
    datavia: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    cell1: DataTypes.FLOAT,
    cell2: DataTypes.FLOAT,
    cell3: DataTypes.FLOAT,
    cell4: DataTypes.FLOAT,
    cell5: DataTypes.FLOAT,
    cell6: DataTypes.FLOAT,
    cell7: DataTypes.FLOAT,
    cell8: DataTypes.FLOAT,
    cell9: DataTypes.FLOAT,
    cell10: DataTypes.FLOAT,
    cell11: DataTypes.FLOAT,
    cell12: DataTypes.FLOAT,
    cell13: DataTypes.FLOAT,
    cell14: DataTypes.FLOAT,
    avgcellvoltage: DataTypes.FLOAT,
    packvoltage: DataTypes.FLOAT,
    current: DataTypes.FLOAT,
    batterypercent: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};