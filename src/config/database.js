const Sequelize = require('sequelize');

const config = {
    db_host: 'cigarrinho.com',
    db_name: 'tibia',
    db_user: 'admin',
    db_pass: 'Smoking10!',
};

const connection = new Sequelize(config.db_name, config.db_user, config.db_pass, {
    host: config.db_host,
    dialect: 'mysql',
    omitNull: true,
    logging: false,
});

module.exports = {
    config,
    Sequelize,
    connection,
};