'use strict';
const User = require('/home/luizlaljr/Projetos/Node/sqlapi/src/app/models/User');

const view_name = 'view_base';
const query = `SELECT users.id, users.antique, maxPromotions.last_promotion, posts.name as post, users.name, users.condition,  users.date_condition, users.document, users.operationality, users.activity, users.project, users.sex, posts.factor, posts.wage 
FROM users  
LEFT OUTER JOIN ( promotions INNER JOIN posts ON posts.id = promotions.post_id) ON users.id = promotions.user_id
INNER JOIN (SELECT promotions.user_id as userId, MAX(promotions.date_promotion) as last_promotion
FROM promotions
GROUP BY promotions.user_id) as maxPromotions ON maxPromotions.userID = users.id AND maxPromotions.last_promotion = promotions.date_promotion
GROUP BY users.id, post, users.name, users.antique, maxPromotions.last_promotion, users.condition, users.date_condition, users.document, users.operationality, users.activity, users.project, users.sex, posts.factor, posts.wage
ORDER BY antique`;

module.exports = {
  up: (User, Sequelize) => {

      return User.sequelize.query(`CREATE VIEW ${view_name} as ${query}`);
    
  },

  down: (User, Sequelize) => {
   
      return User.sequelize.query(`DROP VIEW ${view_name}`);
    
  }
};
