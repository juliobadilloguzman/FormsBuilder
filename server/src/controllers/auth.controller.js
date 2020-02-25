const jwt = require('jsonwebtoken');
const pool = require('../database/database');

exports.login = (req, res) => {
    res.json({ message: 'Login' });
}

exports.signup = (req, res) => {
    res.json({ message: 'Signup' });
}

exports.profile = (req, res) => {
    res.json({ message: 'Profile' });
}