'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Day.belongsToMany(models.User,{
        through:models.DayUser,
        as:'users',
        foreignKey:'dayId'
      });
      Day.hasMany(models.Slot,{
        foreignKey:'dayId',
        as:'slots'
      });
      Day.hasMany(models.Appointment,{
        foreignKey:'dayId',
        as:'appointments'
      });
    };
  }
  Day.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Day',
  });
  return Day;
};