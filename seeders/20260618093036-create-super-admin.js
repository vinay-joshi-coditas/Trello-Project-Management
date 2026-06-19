'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await queryInterface.bulkInsert(
        'users',
        [{
          name: 'Aniruddha',
          email: 'aniruddha.gohad@coditas.com',
          password: '$2a$12$HClv6c8TLMrZO6bmQKjFXuKDJDnS6jPZiVSsGpysRG0goxYqsB2hC',
          role: 'SuperAdmin'
        }],{}
      )
      
    } catch (error) {
      console.log(error);
      
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */

   await queryInterface.delete('users', null, {});
  }
};
