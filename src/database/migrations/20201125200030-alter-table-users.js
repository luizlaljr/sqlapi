'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('users', 'date_query',{ type: Sequelize.DATEONLY,
      defaultValue: '01/01/2020', });
    
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('users', 'date_query');
  }
};
