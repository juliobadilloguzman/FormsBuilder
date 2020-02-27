const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const LlenadoPreguntaAbierta = sequelize.define('LlenadoPreguntaAbierta', {

    idLlenadoPreguntaAbierta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_idLlenado: {
        type: Sequelize.INTEGER,
    },
    fk_idCuestionarioPreguntaAbierta: {
        type: Sequelize.INTEGER,
    },
    Respuesta: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = LlenadoPreguntaAbierta;