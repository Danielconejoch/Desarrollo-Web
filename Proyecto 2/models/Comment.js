'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'username',
        targetKey: 'username',
        onDelete: 'SET NULL'
      });
    }
  }

  Comment.init({
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'username'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
