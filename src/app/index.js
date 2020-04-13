const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

Post.init(connection);
User.init(connection);

module.exports = connection;