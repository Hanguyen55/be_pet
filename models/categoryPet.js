"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryPet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   this.hasMany(models.Product);
    }
  }
  CategoryPet.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING(500),
      description: DataTypes.STRING(500),
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CategoryPet",
    }
  );
  return CategoryPet;
};
