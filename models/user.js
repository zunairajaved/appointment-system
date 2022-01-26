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
    fullName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type:DataTypes.STRING(64),
      allowNull:false
    },
    role:{
      type:DataTypes.ENUM({
      values:['admin','user','consultant']
    }),
    defaultValue:'user'
  }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};