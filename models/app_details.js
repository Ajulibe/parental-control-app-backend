'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  app_details.init({
    device_id: DataTypes.STRING,
    installed_app_name: DataTypes.STRING,
    app_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'app_details',
  });
  return app_details;
};