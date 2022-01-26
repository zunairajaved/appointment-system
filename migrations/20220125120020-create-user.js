'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
          isEmail : {msg:'Email must be type of email'}
      }
      },
      password: {
        type: Sequelize.STRING(64),
        validate:{
          is:/^[0-9a-f]{64}$/i
        }
      },
      role:{
        type:Sequelize.ENUM({
          values:['admin','user','consultant']
        }),
        default:'user',
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
    await queryInterface.dropTable('Users');
  }
};