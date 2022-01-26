'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dayId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'Days',
          key:'id',
          as:'dayId' 
        }
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull:false
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Slots');
  }
};