'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Businesses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Businesses.hasMany(models.Products,{
        foreignKey: "business_id", as:"business"
      })
    }
  };
  Businesses.init({
    name: DataTypes.STRING,
    slogan: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    weblink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Businesses',
  });
  return Businesses;
};