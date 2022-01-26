'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete:'CASCADE',
      });
      Appointment.belongsTo(models.Day,{
        foreignKey:'dayId',
        onDelete:'CASCADE',
      });
    }
  }
  Appointment.init({
    dayId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    slotId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    consultantId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type:DataTypes.ENUM({
        values:['Pending','Canceled','In progress','Completed']
      }),
      defaultValue:'Pending'
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};