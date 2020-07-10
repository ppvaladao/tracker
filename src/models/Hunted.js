const {Sequelize, connection} = require('../config/database');

const Hunted = connection.define('hunted', {
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
    accountStatus: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
    },
    lastLogin: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true,
    },
    online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Hunted;