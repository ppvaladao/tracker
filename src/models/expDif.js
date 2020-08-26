const {Sequelize, connection} = require('../config/database');
const Character = require('./Character');

const ExpDif = connection.define('ExpDif', {
    expDif: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    }
}, {
    timestamps: true,
});
ExpDif.belongsTo(Character)
//ExpDif.sync({force: true})
module.exports = ExpDif;