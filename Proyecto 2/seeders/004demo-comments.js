'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      { content: 'Great insights on anxiety!', username: 'mary', postId: 1 },
      { content: 'Very helpful information.', username: 'susan', postId: 2 },
      { content: 'I loved this post!', username: 'john', postId: 3 }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
