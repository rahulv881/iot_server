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
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    imei: DataTypes.STRING,
    cell1: DataTypes.STRING,
    cell2: DataTypes.STRING,
    cell3: DataTypes.STRING,
    cell4: DataTypes.STRING,
    cell5: DataTypes.STRING,
    cell6: DataTypes.STRING,
    cell7: DataTypes.STRING,
    cell8: DataTypes.STRING,
    cell9: DataTypes.STRING,
    cell10: DataTypes.STRING,
    cell11: DataTypes.STRING,
    cell12: DataTypes.STRING,
    cell13: DataTypes.STRING,
    cell14: DataTypes.STRING,
    avgcellvoltage: DataTypes.STRING,
    packvoltage: DataTypes.STRING,
    current: DataTypes.STRING,
    batterypercent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Device',
  });


  return Device;
};