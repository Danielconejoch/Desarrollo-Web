'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Post, {
        foreignKey: 'categoryId',
        onDelete: 'SET NULL'
      });
    }
  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};
