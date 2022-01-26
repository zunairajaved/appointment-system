'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DayUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dayId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        reference:{
          model:'Days',
          key:'id',
          as:'dayId'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        reference:{
          model:'Users',
          key:'id',
          as:'userId'
        }
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
    await queryInterface.dropTable('DayUsers');
  }
};