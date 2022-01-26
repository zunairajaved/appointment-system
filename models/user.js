'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Day,{
        through: models.DayUser,
        as:'days',
        foreignKey:'userId'
      });
      User.hasMany(models.Appointment,{
        foreignKey:'userId',
        as:'appointments'
      });
    };
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:DataTypes.ENUM({
      values:['admin','user','consultant']
    })
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};