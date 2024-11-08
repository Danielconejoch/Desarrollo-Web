'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        as: 'author',
        foreignKey: 'authorUsername',
        targetKey: 'username',
        onDelete: 'SET NULL'
      });

      // Relación con Category
      Post.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'SET NULL'
      });

      // Relación con Comment
      Post.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });
    }
  }

  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(300)
    },
    authorUsername: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'username'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
