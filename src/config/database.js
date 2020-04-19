require('dotenv').config({
    path: '.env',
});

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    define: {
        timestamp: true,
        underscored: true,
    },
};