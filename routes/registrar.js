var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../config');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.registrar = function (req, res) {
    var passwordEncriptada = cryptr.encrypt(req.body.password);
    var usuario = {
        "username": req.body.usuario,
        "name": req.body.nombre,
        "fecha_Nacimiento": req.body.fecha_nacimiento,
        "email": req.body.correo,
        "contrasenia": passwordEncriptada,
        "pais": req.body.pais,
        "paciente": req.body.tipo_usuario,
    }

    connection.query('INSERT INTO user SET ?', [usuario], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'Error en el query' + error
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
