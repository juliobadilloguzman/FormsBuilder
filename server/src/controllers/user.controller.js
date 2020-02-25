const sql = require('mssql');
const { database } = require('../database/config');
var conexion = sql.connect(database);


module.exports.obtenerUsuario = (req, res, next) => {
    conexion.then(pool => {
        // Query
        
        return pool.request()
        .input('input_parameter', sql.Int, 1)
        .query('SELECT * FROM Usuario WHERE idUsuario = @input_parameter')
    }).then(result => {
        console.dir(result)
        res.json(result);
    }).catch(err => {
      // ... error checks
    });
};
