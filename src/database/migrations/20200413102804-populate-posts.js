'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('posts', [{

        name: 'TB',
        factor: 1.43220338983051,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'MB',
        factor: 1.43220338983051,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'BR',
        factor: 1.43220338983051,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'CL',
        factor: 1.19491525423729,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'TC',
        factor: 1.19491525423729,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'MJ',
        factor: 1.19491525423729,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'CP',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '1T',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '2T',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'SO',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '1S',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '2S',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '3S',
        factor: 1.0,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'CB',
        factor: 0.830508474576271,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'TM',
        factor: 0.830508474576271,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'S1',
        factor: 0.830508474576271,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'T1',
        factor: 0.830508474576271,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'T2',
        factor: 0.830508474576271,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'S2',
        factor: 0.830508474576271,
        created_at: new Date,
        updated_at: new Date,
      },] 
    );
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('users', null, {});
    
  }
};