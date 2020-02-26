const sql = require('mssql');
const { database } = require('../database/config');
const conexion = sql.connect(database);

module.exports = conexion;