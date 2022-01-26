'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
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
      slotId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'Users',
          key:'id',
          as:'userId' 
        }
      },
      consultantId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        references:{
          model:'Users',
          key:'id',
          as:'consultantId' 
        }
      },
      status: {
        type:Sequelize.ENUM({
          values:['Pending','Canceled','In progress','Completed']
        }),
        default:'Pending'
      },
      description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Appointments');
  }
};