const { Sequelize, connection } = require('../config/database');

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
    exp: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: true,

    },
    expDif: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
}, {
    timestamps: true,
});

//Character.sync({force: true})

module.exports = Character;


