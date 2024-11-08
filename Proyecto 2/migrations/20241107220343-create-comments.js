module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username',
        },
        onDelete: 'SET NULL',
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  },
};
