const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { database } = require('../database/config');
var conexion = sql.connect(database);

exports.login = (req, res) => {
    res.json({ message: 'Login' });
}

exports.signup = (req, res) => {
    res.json({ message: 'Signup' });
}

exports.profile = (req, res) => {
    res.json({ message: 'Profile' });
}