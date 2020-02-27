const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const Opciones = sequelize.define('Opciones', {

    idOpciones: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Texto: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = Opciones;