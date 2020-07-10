const {Sequelize, connection} = require('../config/database');

const Death = connection.define('death', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    characterId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'character',
            key: 'id',
        },
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Death;