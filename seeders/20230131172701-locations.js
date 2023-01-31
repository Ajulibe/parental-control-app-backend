'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'locations',
      [
        {
          device_id: 'device1',
          latitude: 37.7749,
          longitude: -122.4194,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device2',
          latitude: 47.6062,
          longitude: -122.3321,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device3',
          latitude: 40.7128,
          longitude: -74.006,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device4',
          latitude: 34.0522,
          longitude: -118.2437,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device5',
          latitude: 41.8781,
          longitude: -87.6298,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device6',
          latitude: 29.7604,
          longitude: -95.3698,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device7',
          latitude: 33.4484,
          longitude: -112.074,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device8',
          latitude: 25.7617,
          longitude: -80.1918,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device9',
          latitude: 32.7157,
          longitude: -117.1611,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device10',
          latitude: 37.3382,
          longitude: -121.8863,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          device_id: 'device11',
          latitude: 39.9526,
          longitude: -75.1652,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations', null, {});
  }
};
