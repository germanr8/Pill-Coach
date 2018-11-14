var Cryptr = require('cryptr');
var express = require('express');
var connection = require('./../config');
//cryptr = new Cryptr('myTotalySecretKey');

module.exports.registrar = function(req, res) {
  var passwordEncriptada = cryptr.encrypt(req.body.password_r);
  var usuario = {
    username: req.body.usuario_r,
    nombre_completo: req.body.nombre,
    fecha_Nacimiento: req.body.fecha_nacimiento,
    email: req.body.correo_r,
    contrasenia: passwordEncriptada,
    pais: req.body.pais,
    paciente: req.body.tipo_usuario
  };

  connection.query(
    'SELECT * FROM user WHERE username = ?',
    [req.body.usuario_r, req.body.correo_r],
    function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else if (results.length > 0) {
        res.render('sign-up.ejs', {
          status: false,
          message: 'El nombre de usuario ya existe. Eliga otra porfavor.'
        });
      } else {
        connection.query('INSERT INTO user SET ?', [usuario], function(
          error,
          results,
          fields
        ) {
          if (error) {
            return res.status(500).send(error);
          } else {
            res.render('sign-up.ejs', {
              status: true,
              message: 'Usuario registrado exitosamente. Puede iniciar sesión.'
            });
          }
        });
      }
    }
  );
};
