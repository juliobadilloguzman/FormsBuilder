const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const PreguntaAbierta = sequelize.define('PreguntaAbierta', {

    idPreguntaAbierta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Pregunta: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = PreguntaAbierta;