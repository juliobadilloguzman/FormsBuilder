const jwt = require('jsonwebtoken');
const sql = require('mssql');
const express = require('express');
const db = require('../database/database');
const Cuestionario = require('../models/Cuestionario');
const CuestionarioPreguntaMult = require('../models/CuestionarioPreguntasMult');
const LlenadoPreguntaAbierta = require('../models/LlenadoPreguntaAbierta');
const LlenadoPreguntaMult = require('../models/LlenadoPreguntaMult');
const LlenadoCuestionario = require('../models/LlenadoCuestionario');
const bycrypt = require('bcryptjs');

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

function CreateMultipleQuestion(idCuestionario, params, hasUniqueAnswer) {

    let pregunta = params.texto;
    let opciones = ["", "", "", "", ""];

    for (let i = 0; i < params.opciones.length; i++) {
        opciones[i] = params.opciones[i].opcion;
    }

    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_textoPregunta', sql.VarChar(500), pregunta);
    request.input('p_unicaRespuesta', sql.Bit, hasUniqueAnswer);
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
        //Crear el cuestionario
        Cuestionario.create(cuestionarioData)
            .then(cuestionario => {
                resolve(cuestionario.dataValues);
            }).catch(error => { reject('error') });
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

function GetMultipleQuestions(idCuestionario, cuestionarioJson) {

    let request = new sql.Request();
    let preguntasMultiplesObj = [];
    let seleccionMultiplesObj = [];

    return new Promise((resolve, reject) => {

        setTimeout(() => resolve(preguntasMultiplesObj), 1000);

        //Buscar todas las preguntas del cuestionario
        CuestionarioPreguntaMult.findAll({
            where: {
                fk_idCuestionario: idCuestionario
            }
        }).then(CuestionarioPreguntaMult => {

            for (index in CuestionarioPreguntaMult) {

                let pregMult = {};
                let element = CuestionarioPreguntaMult[index];

                //Conseguir el texto de la pregunta
                request = new sql.Request();
                request.input('p_idCuestionarioPreguntaMult', sql.Int, element.idCuestionarioPreguntasMult);
                request.execute('textoPreguntaMult_R', (err, result) => {
                    pregMult["texto"] = result.recordset[0].Pregunta;
                });

                //Conseguir las opciones
                request2 = new sql.Request();
                request2.input('p_idCuestionarioPreguntaMult', sql.Int, element.idCuestionarioPreguntasMult);
                request2.execute('OpcionesPreguntaMult_R', (err, result2) => {
                    pregMult["opciones"] = result2.recordset;
                });


                //Agregar el registro al arreglo que corresponde
                request3 = new sql.Request();
                request3.query(`SELECT dbo.hasUniqueAnswer(${element.idCuestionarioPreguntasMult})`, (err, result) => {
                    if (err)
                        res.json(err);
                    if (result.recordset[0][""]) {
                        preguntasMultiplesObj.push(pregMult);
                    } else {
                        seleccionMultiplesObj.push(pregMult);
                    }
                });
            }
        })
        cuestionarioJson["preguntasMultiples"] = preguntasMultiplesObj;
        cuestionarioJson["seleccionMultiple"] = seleccionMultiplesObj;
    });
}

async function GetFormOpenQuestion(idCuestionario, pregunta) {
    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_pregunta', sql.VarChar, pregunta);

    //Ejecutar el request
    return new Promise((resolve, reject) => {
        request.execute('getCuestionarioPreguntaAbierta', (err, result) => {
            resolve(result.recordset[0]);
        });
    });
}

async function GetFormMultQuestionOption(idCuestionario, pregunta, respuesta) {
    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_pregunta', sql.VarChar, pregunta);
    request.input('p_opcion', sql.VarChar, respuesta);

    //Ejecutar el request
    return new Promise((resolve, reject) => {
        request.execute('getCuestionarioPreguntaMult', (err, result) => {
            resolve(result.recordset[0]);
        });
    });
}

module.exports.CreateUpdateForm = (req, res) => {
    //Checar si el formulario ya existe
    Cuestionario.findOne({
        where: {
            Nombre: req.body.Nombre
        }
    }).then(cuestionario => {

        //Si se va a actualizar el cuestionario
        //if (cuestionario) {
        //TODO: Actualizar cuestionario
        //}

        //Si se va a crear el cuestionario
        //else {
        //Creación del cuestionario
        Create(req.body.idUsuarioCreador, req.body).then((newCuestionario) => {

            //Crear las preguntas abiertas
            req.body.preguntasAbiertas.forEach(element => {
                if (CreateOpenQuestion(newCuestionario.idCuestionario, element) == -1)
                    console.log("Error al crear pregunta abierta");
            });

            //Crear las preguntas múltiples
            req.body.preguntasMultiples.forEach(element => {
                if (CreateMultipleQuestion(newCuestionario.idCuestionario, element, 1) == -1)
                    console.log("Error al crear pregunta múltiple");
            });

            //Crear las preguntas de selección multiple
            req.body.seleccionMultiple.forEach(element => {
                if (CreateMultipleQuestion(newCuestionario.idCuestionario, element, 0) == -1)
                    console.log("Error al crear pregunta selección multiple");
            });
        });
        //}
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

            GetMultipleQuestions(cuestionario.idCuestionario, cuestionarioJson).then((preguntasMultiples) => {
                // Append se hace dentro de GetMultipleQuestions
                // cuestionarioJson["preguntasMultiples"] = preguntasMultiples;
            }).then(() => {
                GetOpenQuestions(cuestionario.idCuestionario).then((preguntasAbiertas) => {
                    cuestionarioJson["preguntasAbiertas"] = preguntasAbiertas;
                    res.json(cuestionarioJson);
                });
            });
        } else {
            console.log("No existe el cuestionario");
            return;
        }
    });
}

async function fillOpenQuestions(array, idCuestionario, idLlenado) {
    for (const item of array) {

        //Obtener el texto de la pregunta y respuesta abierta
        let pregunta = item.texto;
        let respuesta = item.respuesta;

        //Obtener la pregunta abierta por medio de un procedimiento (dado un cuestionario y el texto de la pregunta)
        await GetFormOpenQuestion(idCuestionario, pregunta).then((formOpenQuestion) => {
            const llenadoData = {
                fk_idLlenado: idLlenado,
                fk_idCuestionarioPreguntaAbierta: formOpenQuestion.idCuestionarioPreguntaAbierta,
                Respuesta: respuesta
            }

            LlenadoPreguntaAbierta.create(llenadoData)
                .then(llenadoPreguntaAbierta => {
                    console.log(llenadoPreguntaAbierta.dataValues);
                }).catch(error => { res.json(error) });
        });
    }
}

async function fillMultipleQuestions(array, idCuestionario, idLlenado) {
    for (const item of array) {

        //Obtener el texto de la pregunta y la respuesta múltiple
        let pregunta = item.texto;
        let respuesta = item.respuesta;

        //Obtener la pregunta múltiple y la opción por medio de un procedimiento (dado un cuestionario, la pregunta y la opción)
        await GetFormMultQuestionOption(idCuestionario, pregunta, respuesta).then((formMultQuestion) => {

            const llenadoData = {
                fk_idCuestionarioPreguntasMult: formMultQuestion.idCuestionarioPreguntasMult,
                fk_idLlenado: idLlenado,
                fk_idOpcionesPreguntaMultcol: formMultQuestion.idOpcionesPreguntaMultcol
            }

            LlenadoPreguntaMult.create(llenadoData)
                .then(llenadoPreguntaMult => {
                    console.log(llenadoPreguntaMult.dataValues);
                }).catch(error => { res.json(error) });
        });
    }
}

async function fillSeleccionQuestions(array, idCuestionario, idLlenado) {
    for (const item of array) {

        //Obtener el texto de la pregunta y la respuesta múltiple
        let pregunta = item.texto;
        let respuesta = item.respuestas;

        for (const opcion of respuesta) {
            //Obtener la pregunta múltiple y la opción por medio de un procedimiento (dado un cuestionario, la pregunta y la opción)
            await GetFormMultQuestionOption(idCuestionario, pregunta, opcion).then((formMultQuestion) => {

                const llenadoData = {
                    fk_idCuestionarioPreguntasMult: formMultQuestion.idCuestionarioPreguntasMult,
                    fk_idLlenado: idLlenado,
                    fk_idOpcionesPreguntaMultcol: formMultQuestion.idOpcionesPreguntaMultcol
                }


                LlenadoPreguntaMult.create(llenadoData)
                    .then(llenadoPreguntaMult => {
                        console.log(llenadoPreguntaMult.dataValues);
                    }).catch(error => { res.json(error) });

            });
        }
    }
}

module.exports.FillForm = (req, res) => {

    let idUsuario = req.body.idUsuario;
    let idCuestionario = req.body.idCuestionario;

    //Crear el request de llenado
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idUsuario', sql.Int, idUsuario);
    request.input('p_idCuestionario', sql.Int, idCuestionario);

    //Ejecutar el request
    request.execute('LlenadoCuestionario_C', (err, result) => {

        let idLlenado = result.recordset[0].idLlenado;

        //Guardar preguntas múltiples
        fillMultipleQuestions(req.body.preguntasMultiples, idCuestionario, idLlenado);

        fillSeleccionQuestions(req.body.seleccionMultiple, idCuestionario, idLlenado);

        //Guardar preguntas abiertas
        fillOpenQuestions(req.body.preguntasAbiertas, idCuestionario, idLlenado);

        console.log("Done");
        res.json("Done");
    });

}

module.exports.VerifyOwner = (req, res) => {
    request = new sql.Request();
    request.input('@p_idCuestionario', sql.Int, req.body.idCuestionario);
    request.input('@p_idUsuario', sql.Int, req.body.idUsuario);
    request.query(`SELECT dbo.isOwner(${req.body.idCuestionario}, ${req.body.idUsuario})`, (err, result) => {
        if (err)
            res.json(err);
        res.json(result.recordset[0][""]);
    });
}

module.exports.ShowAnswers = (req, res) => {
    request = new sql.Request();
    request.input('p_idCuestionario', sql.Int, req.params.idCuestionario);
    request.execute(`LlenadoCuestionario_RA`, (err, result) => {
        if (err)
            res.json(err);

        if (result['recordset'].length <= 0) {
            res.json({ message: 'noUsers' });
        } else {
            res.json(result.recordsets[0]);
        }

        // res.json(result['recordset']);
    });
}

function findAnswer(array, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i]["Pregunta"] === value) {
            return i;
        }
    }
    return -1;
}


module.exports.VerifyOwner = (req, res) => {
    request = new sql.Request();
    request.input('@p_idCuestionario', sql.Int, req.body.idCuestionario);
    request.input('@p_idUsuario', sql.Int, req.body.idUsuario);
    request.query(`SELECT dbo.isOwner(${req.body.idCuestionario}, ${req.body.idUsuario})`, (err, result) => {
        if (err)
            res.json(err);
        res.json(result.recordset[0][""]);
    });
}

module.exports.ShowAnswers = (req, res) => {
    request = new sql.Request();
    request.input('p_idCuestionario', sql.Int, req.params.idCuestionario);
    request.execute(`LlenadoCuestionario_RA`, (err, result) => {
        if (err)
            res.json(err);

        if (result['recordset'].length <= 0) {
            res.json({ message: 'noUsers' });
        } else {
            res.json(result.recordsets[0]);
        }

        // res.json(result['recordset']);
    });
}

function findAnswer(array, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i]["Pregunta"] === value) {
            return i;
        }
    }
    return -1;
}

async function GetUserMultAnswers(idUsuario, idCuestionario) {

    let allAnswers = [];
    let mult = [];

    let request = new sql.Request();

    request.input('p_idUsuario', sql.Int, idUsuario);
    request.input('p_idCuestionario', sql.Int, idCuestionario);

    return new Promise((resolve, reject) => {

        request.execute(`LlenadoPreguntaMult_RA`, (err, result) => {
            if (err) { resolve(err); }

            for (index in result.recordset) {
                let preguntaTemp = {};
                preguntaTemp["Pregunta"] = result.recordset[index].Pregunta;
                preguntaTemp["Respuesta"] = result.recordset[index].Opcion;

                if (mult.includes(result.recordset[index].Pregunta)) {
                    let modifyIndex = findAnswer(allAnswers, result.recordset[index].Pregunta);
                    allAnswers[modifyIndex]["Respuesta"] = allAnswers[modifyIndex]["Respuesta"].concat(", ").concat(result.recordset[index].Opcion);
                } else {
                    mult.push(result.recordset[index].Pregunta);
                    allAnswers.push(preguntaTemp);
                }
            }

            resolve(allAnswers);
        });
    });
}

module.exports.ShowUserAnswers = (req, res) => {

    let idUsuario = req.params.idUsuario;
    let idCuestionario = req.params.idCuestionario;

    //Preguntas de opción múltiple
    GetUserMultAnswers(idUsuario, idCuestionario).then((allAnswers) => {

        //Preguntas abiertas
        request = new sql.Request();
        request.input('p_idUsuario', sql.Int, idUsuario);
        request.input('p_idCuestionario', sql.Int, idCuestionario);
        request.execute(`LlenadoPreguntaAbierta_RA`, (err, result) => {
            if (err) { res.json(err); }
            for (index in result.recordset) {
                let preguntaTemp = {};
                preguntaTemp["Pregunta"] = result.recordset[index].Pregunta;
                preguntaTemp["Respuesta"] = result.recordset[index].Respuesta;
                allAnswers.push(preguntaTemp);
            }
            res.json(allAnswers);
        });
    });
}

module.exports.DeleteForm = (req, res) => {
    request = new sql.Request();
    request.input('p_idCuestionario', sql.Int, req.params.idFormulario);
    request.execute(`Cuestionario_D`, (err, result) => {
        if (err)
            res.json(err);
        res.json({ message: 'deleted' });
    });
}