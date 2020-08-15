const {Sequelize, connection} = require('../config/database');

const Logs = connection.define('logs', {
    logs: {
        type: Sequelize.TEXT,
        defaultValue: false,
        allowNull: true,
    },
}, {
    timestamps: true,
});

//Logs.sync({force: true})

module.exports = Logs;