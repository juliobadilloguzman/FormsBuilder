const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const LlenadoCuestionario = sequelize.define('LlenadoCuestionario', {

    idLlenado: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    fk_idUsuario: {
        type: Sequelize.INTEGER
    },
    fk_idCuestionario: {
        type: Sequelize.INTEGER
    },
    fk_idUsuario: {
        type: Sequelize.INTEGER
    },
    Fecha: {
        type: Sequelize.DATE
    },

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LlenadoCuestionario;