var connection = require('./../../config');
var express = require('express');

module.exports = {
  loadCalendar: (req, res) => {
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
        res.render('modulo-calendario.ejs', {
          listaMedicinas: results,
          titulo: 'Panel de calendario',
          status: true,
          message: 'Éxito'
        });
      }
    });
  },

  loadSpecificDaySchedule: (req, res) => {
    var currentDate = new Date();
    currentDate.setHours(12);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    var selectedDate = new Date(req.params.date + ' 00:00');
    selectedDate.setHours(12);
    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);

    var dayDiff = daysUpTo(currentDate, selectedDate);

    // Si el dia de diferencia es menor o igual a cero (se eligio uno dia antes del actual), no saldra ninguna receta
    if (dayDiff > 0) {
      var current_user = req.session.userid;
      var query =
        'SELECT * ' +
        'FROM receta a ' +
        'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
        'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion ' +
        'WHERE a.username_Paciente = ? AND a.diasDosis>?';

      connection.query(query, [current_user, dayDiff], function(
        error,
        results,
        fields
      ) {
        if (error) {
          return res.status(500).send(error);
        } else {
          res.render('dia-elegido.ejs', {
            listaMedicinas: results,
            dia:
              selectedDate.getDay() +
              '/' +
              selectedDate.getMonth() +
              '/' +
              selectedDate.getFullYear(),
            titulo: 'Agenda de día',
            status: true,
            message: 'Éxito'
          });
        }
      });
    } else {
      res.render('dia-elegido.ejs', {
        dia:
          selectedDate.getDay() +
          '/' +
          selectedDate.getMonth() +
          '/' +
          selectedDate.getFullYear(),
        titulo: 'Agenda de día',
        status: false,
        message: 'No éxito'
      });
    }
  }
};

function treatAsUTC(date) {
  var result = date;
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

function daysUpTo(startDate, endDate) {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate) + 1) / millisecondsPerDay;
}
