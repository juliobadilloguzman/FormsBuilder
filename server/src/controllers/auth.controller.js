const jwt = require('jsonwebtoken');
const sql = require('mssql');
const express = require('express');
const db = require('../database/database');
const User = require('../models/User');
const bycrypt = require('bcryptjs');

module.exports.login = (req, res) => {

    //Buscamos el usuario
    User.findOne({
        where: {
            Nombre: req.body.Nombre
        }
    }).then(user => {

        //Si encontro al usuario, comparamos las contraseñas
        bycrypt.compare(req.body.Contrasena, user.Contrasena, function(err, result) {

            //Si hay error
            if (err) { throw (err); }

            //Si las contraseñas son iguales 
            if (result) {
                let token = jwt.sign(user.dataValues, "primerparcialhugo", {
                    expiresIn: 1440
                });

                res.json({ token: token });

            } else {
                res.json({ message: 'La contraseña es incorrecta' });
            }

        });

    }).catch(err => {
        res.json({ message: 'El usuario no existe' })

    })

}

module.exports.signup = (req, res) => {

    //Datos a insertar
    const userData = {
        Nombre: req.body.Nombre,
        Contrasena: req.body.Contrasena,
    }

    //Buscamos el usuario por el nombre de usuario
    User.findOne({
            where: {
                Nombre: req.body.Nombre
            }
        }).then(user => {

            //Si no encuentra el usuario...
            if (!user) {

                console.log('A hashear: ' + userData.Contrasena);
                //Hasheamos la contraseña
                const hash = bycrypt.hashSync(userData.Contrasena, 10);
                userData.Contrasena = hash;

                //Creamos el usuario
                User.create(userData)
                    .then(user => {

                        //Generamos el token
                        let token = jwt.sign(user.dataValues, "primerparcialhugo", {
                            expiresIn: 1440
                        });

                        console.log(token);

                        //Mandamos el token
                        res.json({ token: token });

                    })
                    .catch(err => {
                        res.send(err);
                    });

                //En caso de no existir...
            } else {
                res.json({ message: 'User already exists' });
            }
        })
        .catch(err => {
            res.send('Error ' + err);
        })

}

module.exports.profile = (req, res) => {

    let token = req.headers['authorization']

    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        })
        return;
    }

    let decoded = jwt.verify(token, "primerparcialhugo");

    User.findOne({
            where: {
                idUsuario: decoded.idUsuario
            }
        }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.json({ message: 'El usuario no existe' });
            }
        })
        .catch(err => {
            res.send('Error: ' + err);
        })

}