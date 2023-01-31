'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'authorised_parents',
      [
        {
          email_address: 'parent1@example.com',
          password: 'password1',
          child_name: 'child1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent2@example.com',
          password: 'password2',
          child_name: 'child2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent3@example.com',
          password: 'password3',
          child_name: 'child3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent4@example.com',
          password: 'password4',
          child_name: 'child4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent5@example.com',
          password: 'password5',
          child_name: 'child5',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent6@example.com',
          password: 'password6',
          child_name: 'child6',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent7@example.com',
          password: 'password7',
          child_name: 'child7',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent8@example.com',
          password: 'password8',
          child_name: 'child8',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent9@example.com',
          password: 'password9',
          child_name: 'child9',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent10@example.com',
          password: 'password10',
          child_name: 'child10',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email_address: 'parent11@example.com',
          password: 'password11',
          child_name: 'child11',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('authorised_parents', null, {});
  }
};
