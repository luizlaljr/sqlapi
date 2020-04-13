module.exports = {
    dialect: 'postgres',
    host: process.env.DB_USER,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    operatorAliases: false,
    logging: false,
    define: {
        timestamp: true,
        underscored: true,
    },
};