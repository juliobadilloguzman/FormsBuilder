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
        
        if(!cuestionario)
            console.log("No hay ningun cuestionario creado por el idCreador ".concat(idCreador));
        
        res.json(cuestionario);
    })
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

function CreateOpenQuestion(idCuestionario, params) {
    let pregunta = params.texto;

    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_textoPregunta', sql.VarChar(500), pregunta);

    //Ejecutar el request
    request.execute('preguntaAbierta_C', (err, result) => {
        return result;//res.json(result.recordset);
    });
}

function CreateMultipleQuestion(idCuestionario, params) {
    let pregunta = params.texto;

    let opciones = ["", "", "", "", ""];

    for(let i = 0; i < params.opciones.length; i++){
        opciones[i] = params.opciones[i].opcion;
    }

    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_textoPregunta', sql.VarChar(500), pregunta);
    request.input('p_opcion1_texto', sql.VarChar(100), opciones[0]);
    request.input('p_opcion2_texto', sql.VarChar(100), opciones[1]);
    request.input('p_opcion3_texto', sql.VarChar(100), opciones[2]);
    request.input('p_opcion4_texto', sql.VarChar(100), opciones[3]);
    request.input('p_opcion5_texto', sql.VarChar(100), opciones[4]);
    
    //Ejecutar el request
    request.execute('preguntaMultiple_C', (err, result) => {
        return result;
    });
}

function Create(idCreador, params) {
    //Datos a insertar
    const cuestionarioData = {
        Nombre: params.Nombre,
        fk_idUsuarioCreador: idCreador,
        Descripcion: params.Descripcion,
    }

    return new Promise((resolve, reject) => {
        Cuestionario.create(cuestionarioData)
            .then(cuestionario => {
                resolve(cuestionario.dataValues);

            }).catch(error => { reject('errorddd') });
    });
}


module.exports.CreateUpdateForm = (req, res) => {
    //Checar si el formulario ya existe
    Cuestionario.findOne({
        where: {
            Nombre: req.body.Nombre
        }
    }).then(cuestionario => {
        //TODO: Si se va a actualizar el cuestionario
        if (cuestionario) {

            //Modificar las preguntas abiertas
            /*req.body.preguntasAbiertas.forEach(element => {
                this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
            });*/

            //Modificar las preguntas múltiples
            /*req.body.preguntasAbiertas.forEach(element => {
                this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
            });*/
        }

        //Si se va a crear el cuestionario
        else {
            //Creación del cuestionario
            Create(1, req.body).then((newCuestionario) => {

                //Crear las preguntas abiertas
                req.body.preguntasAbiertas.forEach(element => {
                    if(CreateOpenQuestion(newCuestionario.idCuestionario, element) == -1)
                        console.log("Error al crear pregunta abierta");
                });

                //Crear las preguntas múltiples
                req.body.preguntasMultiples.forEach(element => {
                    if(CreateMultipleQuestion(newCuestionario.idCuestionario, element) == -1)
                        console.log("Error al crear pregunta múltiple");
                });
            });

        }
    }).then(() => {
        //Mandar un response de que ya terminó el proceso
        res.json("Done");
    });
}

/*
module.exports.GetFormQuestions = (req, res) => {
    //Checar si el formulario ya existe
    Cuestionario.findOne({
        where: {            
            Nombre: req.body.idForm
        }
    }).then(cuestionario => {

        //Checar si el cuestionario existe
        if (cuestionario) {

        }
        else{
            console.log("No existe el cuestionario");
            return;
        }

            //Modificar las preguntas abiertas
            req.body.preguntasAbiertas.forEach(element => {
                this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
            });

            //Modificar las preguntas múltiples
            req.body.preguntasAbiertas.forEach(element => {
                this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
            });
        }

        //Si se va a crear el cuestionario
        else {
            //Creación del cuestionario
            Create(1, req.body).then((newCuestionario) => {

                //Crear las preguntas abiertas
                req.body.preguntasAbiertas.forEach(element => {
                    if(CreateOpenQuestion(newCuestionario.idCuestionario, element) == -1)
                        console.log("Error al crear pregunta abierta");
                });

                //Crear las preguntas múltiples
                req.body.preguntasMultiples.forEach(element => {
                    if(CreateMultipleQuestion(newCuestionario.idCuestionario, element) == -1)
                        console.log("Error al crear pregunta múltiple");
                });
            });

        }
    }).then(() => {
        //Mandar un response de que ya terminó el proceso
        res.json("Done");
    });
}*/