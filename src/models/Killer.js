const {Sequelize, connection} = require('../config/database');

const Killer = connection.define('killer', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    deathId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'death',
            key: 'id',
        },
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
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Killer;