const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const CuestionarioPreguntasMult = sequelize.define('CuestionarioPreguntasMult', {

    idCuestionarioPreguntasMult: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },        
    fk_idCuestionario: {
        type: Sequelize.INTEGER
    },
    fk_idPreguntaMultiple: {
        type: Sequelize.INTEGER
    },

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = CuestionarioPreguntasMult;