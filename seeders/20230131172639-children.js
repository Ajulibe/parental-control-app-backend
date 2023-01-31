'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'children',
      [
        {
          device_id: 'device11',
          child_name: 'Child11',
          email_address: 'child11@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device1',
          child_name: 'Child1',
          email_address: 'child1@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device2',
          child_name: 'Child2',
          email_address: 'child2@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device3',
          child_name: 'Child3',
          email_address: 'child3@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device4',
          child_name: 'Child4',
          email_address: 'child4@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device5',
          child_name: 'Child5',
          email_address: 'child5@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device6',
          child_name: 'Child6',
          email_address: 'child6@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device7',
          child_name: 'Child7',
          email_address: 'child7@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device8',
          child_name: 'Child8',
          email_address: 'child8@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device9',
          child_name: 'Child9',
          email_address: 'child9@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device10',
          child_name: 'Child10',
          email_address: 'child10@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('children', null, {});
  }
};
