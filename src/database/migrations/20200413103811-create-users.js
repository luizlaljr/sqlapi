'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      antique: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trigram: {
        type: Sequelize.STRING(3),
        allowNull: false,
        unique: true,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      condition: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      date_condition: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      document:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      operationality: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile: {
        type: Sequelize.STRING(1),
        defaultValue: 'C',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users');

  }
};