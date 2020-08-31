const {Sequelize, connection} = require('../config/database');
const Character = require('./Character');

const Death = connection.define('Death', {
    date: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lvl: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    killerName: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
});
Death.belongsTo(Character)
//Death.sync({force: true})
module.exports = Death;

