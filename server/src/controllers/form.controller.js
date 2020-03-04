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

module.exports.createOpenQuestion = (req, res) =>
{
    let idCuestionario = req.body.idCuestionario;
    let pregunta = req.body.pregunta;

    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_textoPregunta', sql.VarChar(500), pregunta);
    //request.output('output_parameter', sql.Int);

    //Ejecutar el request
    request.execute('preguntaAbierta_C', (err, result) => {
        
        //TODO: Chechar por -1
        res.json(result.recordset);
    });
}

module.exports.createMultipleQuestion = (req, res) =>
{
    res.json(req.body);

    let idCuestionario = req.body.idCuestionario;
    let pregunta = req.body.pregunta;
    let opcion1 = req.body.opcion1;
    let opcion2 = req.body.opcion2;
    let opcion3 = req.body.opcion3;
    let opcion4 = req.body.opcion4;
    let opcion5 = req.body.opcion5;
    
    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_textoPregunta', sql.VarChar(500), pregunta);
    request.input('p_opcion1_texto', sql.VarChar(100), opcion1);
    request.input('p_opcion2_texto', sql.VarChar(100), opcion2);
    request.input('p_opcion3_texto', sql.VarChar(100), opcion3);
    request.input('p_opcion4_texto', sql.VarChar(100), opcion4);
    request.input('p_opcion5_texto', sql.VarChar(100), opcion5);
    request.input('p_opcion1_correcta', sql.SmallInt, true);
    request.input('p_opcion2_correcta', sql.SmallInt, true);
    request.input('p_opcion3_correcta', sql.SmallInt, true);
    request.input('p_opcion4_correcta', sql.SmallInt, true);
    request.input('p_opcion5_correcta', sql.SmallInt, true);

    //Ejecutar el request
    request.execute('preguntaMultiple_C', (err, result) => {
        
        //TODO: Chechar por -1        
        res.json(result.recordset);
    });
}

function CreateOpenQuestionF(idCuestionario, params)
{
    let pregunta = params.texto;

    //Crear el request
    let request = new sql.Request();

    //Declarar parametros de entrada y salida
    request.input('p_idCuestionario', sql.Int, idCuestionario);
    request.input('p_textoPregunta', sql.VarChar(500), pregunta);
    //request.output('output_parameter', sql.Int);

    //Ejecutar el request
    request.execute('preguntaAbierta_C', (err, result) => {
        
        //TODO: Chechar por -1
        res.json(result.recordset);
    });
}

function CreateF(idCreador, params)
{
    //Datos a insertar
    const cuestionarioData = {
        Nombre: params.Nombre,
        fk_idUsuarioCreador: idCreador,
        Descripcion: params.Descripcion,
    }

    Cuestionario.create(cuestionarioData)
        .then(cuestionario => {
            res.json(cuestionario.dataValues);
        });
}

module.exports.CreateUpdateForm = (req, res) => 
{
    jsonTest = {
        "Nombre": "MiCuestionario",
        "Descripcion": "Una descripcion",
        "preguntasMultiples": [
            {
              "texto": "Dia de la semana",
              "ocpiones": [
                  "Lunes",
                  "Martes",
                  "Miercoles"
                ]
            },
            {
              "texto": "Mes del año",
              "ocpiones": [
                  "Enero",
                  "Febrero",
                  "Miercoles"
                ]
            }
          ],
        "preguntasAbiertas": [
            {
              "texto": "cuantos minutos son 34323 horas?"
            },
            {
              "texto": "perros o gatos?"
            }
          ]
    };

    //Checar si el formulario ya existe
    Cuestionario.findOne({
        where: {
            Nombre: req.body.Nombre
        }
    }).then(cuestionario => {
        
        //Si se va a actualizar el cuestionario
        if(cuestionario)
        {
            //Modificar las preguntas abiertas
            jsonTest.preguntasAbiertas.forEach(element => {
                //this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
            });

            //Modificar las preguntas múltiples
            /*jsonTest.preguntasAbiertas.forEach(element => {
                this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
            });*/
        }
        
        //Si se va a crear el cuestionario
        else 
        {
            //Creación del cuestionario
            CreateF(req.body.idCreador, jsonTest).then( (newCuestionario) => {                
    
                //Crear las preguntas abiertas
                jsonTest.preguntasAbiertas.forEach(element => {
                    this.CreateOpenQuestionF(newCuestionario.idCuestionario, element);
                });
    
                //Crear las preguntas múltiples
                /*jsonTest.preguntasAbiertas.forEach(element => {
                    this.CreateOpenQuestionF(cuestionario.idCuestionario, element);
                });*/
            });

        }
    });
}

    