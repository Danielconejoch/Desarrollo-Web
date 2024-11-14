'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      { title: 'Managing Anxiety', content: 'Content on anxiety management...', summary: 'An overview on anxiety', authorUsername: 'john', categoryId: 1 },
      { title: 'Understanding Depression', content: 'Content on depression...', summary: 'An overview on depression', authorUsername: 'mary', categoryId: 2 },
      { title: 'Practicing Mindfulness', content: 'Content on mindfulness...', summary: 'An overview on mindfulness', authorUsername: 'susan', categoryId: 3 }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
