require('dotenv').config({
    path: '.env',
});

module.exports = {
    url: process.env.DB_URL,
    define: {
        timestamp: true,
        underscored: true,
    },
};