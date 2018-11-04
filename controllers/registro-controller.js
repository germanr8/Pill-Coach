var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../config');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.registro = function (req, res) {
    var today = new Date();
    var passwordEncryptada = cryptr.encrypt(req.body.password);
    var user = {
        "username": req.body.usuario,
        "name": req.body.nombre,
        "fecha_Nacimiento": req.body.fecha_nacimiento,
        "email": req.body.correo,
        "contrasenia": passwordEncryptada,
        "pais": req.body.pais,
        "paciente": null,
    }
    connection.query('INSERT INTO user SET ?', user, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'Error en el query.'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'Usuario registrado exitosamente.'
            })
        }
    });
}
