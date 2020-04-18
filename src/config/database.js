require('dotenv').config({
    path: '.env',
});

module.exports = {
        dialect: 'postgres',
        url: process.env.DB_URL,
        use_env_variable: process.env.DB_URL,
        define: {
            timestamp: true,
            underscored: true,
        },
};

/* development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    name: process.env.DB_NAME,
    define: {
        timestamp: true,
        underscored: true,
    },
}, */