const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const OpcionesPreguntaMult = sequelize.define('OpcionesPreguntaMult', {

    idOpcionesPreguntaMult: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },        
    fk_idPreguntaMultiple: {
        type: Sequelize.INTEGER
    },
    fk_idOpciones: {
        type: Sequelize.INTEGER
    },
    Correcta:{
        type: Sequelize.BOOLEAN
    },

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = OpcionesPreguntaMult;