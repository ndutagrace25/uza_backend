'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Businesses,{
        foreignKey: "business_id", as:"business"
      })
      Products.belongsTo(models.Categories,{
        foreignKey: "category_id", as:"category"
      })
      Products.hasMany(models.Requests,{
        foreignKey: "product_id", as: "product"
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    type: DataTypes.ENUM,
    business_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};