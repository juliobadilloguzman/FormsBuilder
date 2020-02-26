const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const User = sequelize.define('Usuario', {

    idUsuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: Sequelize.STRING,
    },
    Contrasena: {
        type: Sequelize.STRING,
    },

}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = User;