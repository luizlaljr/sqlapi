const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Post = require('./models/Post');
const User = require('./models/User');
const Mission = require('./models/Mission');
const Crew = require('./models/Crew');
const Promotion = require('./models/Promotion');

const connection = new Sequelize(dbConfig);

Post.init(connection);
User.init(connection);
Mission.init(connection);
Crew.init(connection);
Promotion.init(connection);

User.associate(connection.models);
Mission.associate(connection.models);
Post.associate(connection.models);

module.exports = connection;