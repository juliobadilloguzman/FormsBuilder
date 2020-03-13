const jwt = require('jsonwebtoken');
const sql = require('mssql');
const express = require('express');
const db = require('../database/database');
const Cuestionario = require('../models/Cuestionario');
const CuestionarioPreguntaMult = require('../models/CuestionarioPreguntasMult');
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

        if (!cuestionario)
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
        return result; //res.json(result.recordset);
    });
}

function CreateMultipleQuestion(idCuestionario, params) {
    let pregunta = params.texto;

    let opciones = ["", "", "", "", ""];

    for (let i = 0; i < params.opciones.length; i++) {
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

function GetOpenQuestions(idCuestionario) {
    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);

    //Ejecutar el request
    return new Promise((resolve, reject) => {
        request.execute('preguntaAbierta_R', (err, result) => {
            resolve(result.recordset);
        });
    });
}

function GetMultipleQuestions(idCuestionario) {

    let request = new sql.Request();
    let preguntasMultiplesObj = [];

    return new Promise((resolve, reject) => {

        setTimeout(() => resolve(preguntasMultiplesObj), 1000);

        CuestionarioPreguntaMult.findAll({
            where: {
                fk_idCuestionario: idCuestionario
            }
        }).then(CuestionarioPreguntaMult => {

            for (index in CuestionarioPreguntaMult) {

                let pregMult = {};
                let element = CuestionarioPreguntaMult[index];
                // CONSEGUIR TEXTO
                request = new sql.Request();
                request.input('p_idCuestionarioPreguntaMult', sql.Int, element.idCuestionarioPreguntasMult);
                request.execute('textoPreguntaMult_R', (err, result) => {
                    pregMult["texto"] = result.recordset[0].Pregunta;
                });
                // CONSEGUIR OPCIONES
                request2 = new sql.Request();
                request2.input('p_idCuestionarioPreguntaMult', sql.Int, element.idCuestionarioPreguntasMult);
                request2.execute('OpcionesPreguntaMult_R', (err, result2) => {
                    pregMult["opciones"] = result2.recordset; 
                });
                // AGREGAR REGISTRO A ARREGLO
                preguntasMultiplesObj.push(pregMult);
            }
        })
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

            console.log(req.body);
            //Creación del cuestionario
            Create(req.body.idUsuarioCreador, req.body).then((newCuestionario) => {

                //Crear las preguntas abiertas
                req.body.preguntasAbiertas.forEach(element => {
                    if (CreateOpenQuestion(newCuestionario.idCuestionario, element) == -1)
                        console.log("Error al crear pregunta abierta");
                });

                //Crear las preguntas múltiples
                req.body.preguntasMultiples.forEach(element => {
                    if (CreateMultipleQuestion(newCuestionario.idCuestionario, element) == -1)
                        console.log("Error al crear pregunta múltiple");
                });
            });

        }
    }).then(() => {
        //Mandar un response de que ya terminó el proceso
        res.json("Done");
    });
}


module.exports.GetFormQuestions = (req, res) => {

    cuestionarioJson = {};

    //Checar si el formulario ya existe
    Cuestionario.findOne({
        where: {
            idCuestionario: req.params.idForm
        }
    }).then(cuestionario => {
        //Checar si el cuestionario existe
        if (cuestionario) {

            cuestionarioJson["Nombre"] = cuestionario.Nombre;
            cuestionarioJson["Descripcion"] = cuestionario.Descripcion;

            GetMultipleQuestions(cuestionario.idCuestionario).then((preguntasMultiples) => {
                cuestionarioJson["preguntasMultiples"] = preguntasMultiples;
                console.log("hola");
                //res.json(preguntasMultiples);
            }).then(()=>{                
                GetOpenQuestions(cuestionario.idCuestionario).then((preguntasAbiertas) => {
                    cuestionarioJson["preguntasAbiertas"] = preguntasAbiertas;
                    //res.json(preguntasAbiertas);
                    console.log("holax2");
                    res.json(cuestionarioJson);
                });
            });
            
        }
        else {
            console.log("No existe el cuestionario");
            return;
        }
    });
}


module.exports.VerifyOwner = (req, res) => {
    request = new sql.Request();
    request.input('@p_idCuestionario', sql.Int, req.body.idCuestionario);
    request.input('@p_idUsuario', sql.Int, req.body.idUsuario);
    request.query(`SELECT dbo.isOwner(${req.body.idCuestionario}, ${req.body.idUsuario})`, (err, result) => {
        if(err)
            res.json(err);
        res.json(result.recordset[0][""]);
    });
}

