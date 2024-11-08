'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'authorUsername',
        onDelete: 'SET NULL'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'username',
        onDelete: 'SET NULL'
      });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('autor', 'administrador'),
      defaultValue: 'autor',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
