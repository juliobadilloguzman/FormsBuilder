const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const PreguntaMultiple = sequelize.define('PreguntaMultiple', {

    idPreguntaMultiple: {
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


module.exports = PreguntaMultiple;