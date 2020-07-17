const {Sequelize, connection} = require('../config/database');

const Character = connection.define('character', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    vocation: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
    },
    hunted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
}, {
    timestamps: true,
});



module.exports = Character;