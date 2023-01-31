'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authorised_parents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  authorised_parents.init(
    {
      email_address: DataTypes.STRING,
      password: DataTypes.STRING,
      child_name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'authorised_parents'
    }
  );
  return authorised_parents;
};
