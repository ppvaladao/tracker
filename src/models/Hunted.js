const {Sequelize, connection} = require('../config/database');
const Character = require('./Character');
const Hunted = connection.define('hunted', {
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
        type: Sequelize.INTEGER,
        defaultValue: false,
        allowNull: true,
    },
}, {
    timestamps: true,
});
//Hunted.belongsTo(Character)
 //Hunted.sync({force: true, cascade: true })

module.exports = Hunted;