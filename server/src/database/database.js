const mysql = require('mysql2');
const { database } = require('./config');
const pool = mysql.createPool(database);
const { promisify } = require('util');

pool.getConnection((error, connection) => {

    if (error) {

        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Error', 'Database Connection Was Closed');
        }

        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.log('Error', 'Database exceeds connections');
        }

        if (error.code === 'ECONNREFUSED') {
            console.log('Error', 'Database connection refused');
        }

    }

    if (connection) {
        connection.release();
    }
    console.log('Database Connected Successfully');
    return;

});

pool.query = promisify(pool.query);

module.exports = pool;