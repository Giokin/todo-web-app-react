const config = {
    database: 'todos',
    dialect: 'postgres',
    logging: false,
    password: 'password',
    username: 'postgres',
};

const Sequelize = require('sequelize');
const conn = new Sequelize(config);

module.exports = conn;
