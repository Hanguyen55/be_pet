'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.User, {
          foreignKey: "useId",
          targetKey: "id",
        });
    }
  };
  Schedule.init({
    useId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.TEXT,
    phone: DataTypes.STRING,
    status: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    weightId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    result: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};