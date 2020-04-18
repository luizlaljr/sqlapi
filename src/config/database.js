require('dotenv').config({
    path: '.env',
});

module.exports = {
    dialect: 'postgres',
    url: process.env.DB_URL,
    define: {
        timestamp: true,
        underscored: true,
    },
};