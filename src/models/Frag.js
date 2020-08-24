const {Sequelize, connection} = require('../config/database');

const Frag = connection.define('frag', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    characterId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'characters',
            key: 'id',
        },
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    justfied: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
}, {
    timestamps: true,
});
//Frag.sync({force: true})
module.exports = Frag;