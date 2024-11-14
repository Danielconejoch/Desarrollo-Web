'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { username: 'john', email: 'john@example.com', password: 'password123', role: 'autor' },
      { username: 'mary', email: 'mary@example.com', password: 'password123', role: 'autor' },
      { username: 'susan', email: 'susan@example.com', password: 'password123', role: 'autor' },
      { username: 'admin', email: 'admin@example.com', password: 'password123', role: 'administrador' }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
