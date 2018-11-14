var connection = require('./../../config');
var express = require('express');

module.exports = {
  loadDailySchedule: (req, res) => {
    var current_user = req.session.userid;
    var query =
      'SELECT * ' +
      'FROM receta a ' +
      'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
      'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion ' +
      'WHERE a.username_Paciente = ? AND a.diasDosis>0';

    connection.query(query, [current_user], function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else {
        res.render('modulo-agenda.ejs', {
          listaMedicinas: results,
          titulo: 'Panel de agenda',
          status: true,
          message: 'Éxito'
        });
      }
    });
  },

  consumeMedicine: (req, res) => {
    var selectedMedicine = req.params.id;
    var query =
      'UPDATE medicina SET vecesTomadaDia = vecesTomadaDia+1 WHERE id_Medicina=?';

    connection.query(query, [selectedMedicine], function(
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(500).send(error);
      } else {
        res.redirect('/daily-schedule');
      }
    });
  }
};
