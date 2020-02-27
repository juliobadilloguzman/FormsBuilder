const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const Cuestionario = sequelize.define('Cuestionario', {

    idCuestionario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    
    Nombre: {
        type: Sequelize.STRING,
    },
    fk_idUsuarioCreador: {
        type: Sequelize.INTEGER
    },
    Descripcion: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Cuestionario;