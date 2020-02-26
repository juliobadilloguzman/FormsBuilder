const sql = require('mssql');
const db = require('../database/database');

module.exports.obtenerUsuario = (req, res, next) => {

    let request = new sql.Request();

    request.query('select * from Usuario WHERE idUsuario = 1', function(err, recordset) {

        if (err) console.log(err)

        res.send(recordset.recordset);

    });

};