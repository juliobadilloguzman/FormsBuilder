const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const CuestionarioPreguntaAbierta = sequelize.define('CuestionarioPreguntaAbierta', {

    idCuestionarioPreguntaAbierta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },        
    fk_idCuestionario: {
        type: Sequelize.INTEGER
    },
    fk_idPreguntaAbierta: {
        type: Sequelize.INTEGER
    },

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = CuestionarioPreguntaAbierta;