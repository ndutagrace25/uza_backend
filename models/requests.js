'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Requests.belongsTo(models.Products,{
        foreignKey: "product_id", as: "product"
      })
    }
  };
  Requests.init({
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Requests',
  });
  return Requests;
};