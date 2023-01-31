'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'app_details',
      [
        {
          device_id: 'device1',
          installed_app_name: 'app1',
          app_status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device2',
          installed_app_name: 'app2',
          app_status: 'blocked',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device3',
          installed_app_name: 'app3',
          app_status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device4',
          installed_app_name: 'app4',
          app_status: 'blocked',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device5',
          installed_app_name: 'app5',
          app_status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device6',
          installed_app_name: 'app6',
          app_status: 'blocked',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device7',
          installed_app_name: 'app7',
          app_status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device8',
          installed_app_name: 'app8',
          app_status: 'blocked',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device9',
          installed_app_name: 'app9',
          app_status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device10',
          installed_app_name: 'app10',
          app_status: 'blocked',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device11',
          installed_app_name: 'app11',
          app_status: 'active',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('app_details', null, {});
  }
};
