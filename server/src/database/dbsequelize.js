const Sequelize = require('sequelize');

const sequilize = new Sequelize("Questionaries", "julioadmin", "PaolaGuzman1996", {
    host: 'servidoravanzadas.database.windows.net',
    port: 1433,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    },
    logging: false,
    freezeTableName: true,
    dialectOptions: {
        options: { encrypt: true }
    }
});

module.exports = sequilize;