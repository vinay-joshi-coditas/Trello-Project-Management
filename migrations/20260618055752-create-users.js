'use strict';
import  { DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable(
      'users', 
      { 
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.fn('gen_random_uuid'),
          allowNull: false  
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: null
        },
        password_version: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        role: {
          type: DataTypes.ENUM("SuperAdmin", "CompanyAdmin", "Member"),
          allowNull: false
        },
        createdAt: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('now')
        },
        updatedAt: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('now')
        },
        createdBy: {
          allowNull: true,
          type: DataTypes.UUID,
          references: {
            model: 'users',
            key: 'id'
          }
        }
      }
    );
  },

  
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('users');
  }
};
