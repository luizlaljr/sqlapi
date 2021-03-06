'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('missions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kind: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      step: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      locale: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      amount: {
        type: Sequelize.REAL,
        allowNull: false,
      },
      transport: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      income: {
        type: Sequelize.REAL,
        allowNull: false,
      },
      start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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

    return queryInterface.dropTable('missions');

  }
};