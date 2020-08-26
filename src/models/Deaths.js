const {Sequelize, connection} = require('../config/database');
const Character = require('./Character');

const Death = connection.define('Death', {
    date: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    lvl: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    killerName: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    }
}, {
    timestamps: true,
});
Death.belongsTo(Character)
//Death.sync({force: true})
module.exports = Death;