'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('posts', [{

        name: 'TB',
        factor: 1.43220338983051,
        wage: 13471.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'MB',
        factor: 1.43220338983051,
        wage: 12912.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'BR',
        factor: 1.43220338983051,
        wage: 12490.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'CL',
        factor: 1.19491525423729,
        wage: 11451.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'TC',
        factor: 1.19491525423729,
        wage: 13471.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'MJ',
        factor: 1.19491525423729,
        wage: 11088.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'CP',
        factor: 1.0,
        wage: 9135.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '1T',
        factor: 1.0,
        wage: 8245.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '2T',
        factor: 1.0,
        wage: 7490.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'SO',
        factor: 1.0,
        wage: 6169.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '1S',
        factor: 1.0,
        wage: 5433.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '2S',
        factor: 1.0,
        wage: 4770.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: '3S',
        factor: 1.0,
        wage: 3825.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'CB',
        factor: 0.830508474576271,
        wage: 2627.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'TM',
        factor: 0.830508474576271,
        wage: 2627.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'T1',
        factor: 0.830508474576271,
        wage: 2325.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'T2',
        factor: 0.830508474576271,
        wage: 2210.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'S1',
        factor: 0.830508474576271,
        wage: 1926.00,
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: 'S2',
        factor: 0.830508474576271,
        wage: 1078.00,
        created_at: new Date,
        updated_at: new Date,
      },] 
    );
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('posts', null, {});
    
  }
};