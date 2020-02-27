const Sequelize = require('sequelize');
const sequelize = require('../database/dbsequelize');

const LlenadoPreguntaMult = sequelize.define('LlenadoPreguntaMult', {

    idLlenadoPreguntaMult: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_idLlenado: {
        type: Sequelize.INTEGER,
    },
    fk_idCuestionarioPreguntasMult: {
        type: Sequelize.INTEGER,
    },
    fk_idOpcionesPreguntaMult: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = LlenadoPreguntaMult;