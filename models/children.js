'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class children extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  children.init(
    {
      device_id: DataTypes.STRING,
      child_name: DataTypes.STRING,
      email_address: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'children'
    }
  );
  return children;
};
