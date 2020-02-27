const jwt = require('jsonwebtoken');
const sql = require('mssql');
const express = require('express');
const db = require('../database/database');
const Cuestionario = require('../models/Cuestionario');
const bycrypt = require('bcryptjs');

module.exports.create = (req, res) => {

    //Datos a insertar
    const cuestionarioData = {
        Nombre: req.body.Nombre,
        fk_idUsuarioCreador: req.body.idCreador,
        Descripcion: req.body.Descripcion,
    }

    Cuestionario.create(cuestionarioData)
        .then(cuestionario => {
            res.json(cuestionario.dataValues);
        });
}

module.exports.getFormByUserId = (req, res) => {
    Cuestionario.findAll({
        where: {
            fk_idUsuarioCreador: req.body.idCreador
        }
    }).then(cuestionario => {
        //TODO: si no hay ningun cuestionario
        //TODO: si el usuario no existe
        console.log(cuestionario);
        res.json(cuestionario);
    });
}

module.exports.getFormById = (req, res) => {
    Cuestionario.findOne({
        where: {
            idCuestionario: req.params.idCuestionario
        }
    }).then(cuestionario => {
        res.json(cuestionario.dataValues);
    });
}

    

    /*//Buscamos el usuario por el nombre de usuario
    User.findOne({
            where: {
                Nombre: req.body.Nombre
            }
        }).then(user => {

            //Si no encuentra el usuario...
            if (!user) {

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


                        //Mandamos el token
                        res.json({ token: token });

                    })
                    .catch(err => {
                        res.send(err);
                    });

                //En caso de YA existir...
            } else {
                res.json({ message: 'alreadyExists' });
            }
        })
        .catch(err => {
            res.send('Error ' + err);
        })*/
