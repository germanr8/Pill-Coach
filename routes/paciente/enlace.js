var connection = require('./../../config');
var express = require('express');

module.exports = {
  generateLink: (req, res) => {
    var usernameCuidador = req.body.user_cuidador;
    var usernamePaciente = req.session.userid;
    var query = 'SELECT * FROM user WHERE username=? AND paciente=0';

    connection.query(query, [usernameCuidador], function(
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(500).send(error);
      } else {
        if (results.length > 0) {
          var query2 = 'INSERT INTO paciente_cuidador SET ?';

          var relacion = {
            username_Cuidador: usernameCuidador,
            username_Paciente: usernamePaciente,
            inicioRelacion: new Date()
          };

          connection.query(query2, [relacion], function(
            error,
            results2,
            fields
          ) {
            if (error) {
              return res.status(500).send(error);
            } else {
              res.render('modulo-enlace.ejs', {
                titulo: 'Panel de enlace',
                message:
                  '¡Ha establecido una conexión con ' +
                  usernameCuidador +
                  ' satisfactoriamente!'
              });
            }
          });
        } else {
          res.render('modulo-enlace.ejs', {
            titulo: 'Panel de enlace',
            message: 'No existe un cuidador con ese nombre de usuario'
          });
        }
      }
    });
  },

  loadLinkModule: (req, res) => {
    res.render('modulo-enlace.ejs', {
      titulo: 'Panel de enlace'
    });
  }
};
