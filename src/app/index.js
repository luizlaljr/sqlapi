const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Post = require('./models/Post');
const User = require('./models/User');

const connection = new Sequelize(dbConfig);

Post.init(connection);
User.init(connection);

User.associate(connection.models);

module.exports = connection;