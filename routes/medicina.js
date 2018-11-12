var connection = require('./../config');
var express = require('express');

module.exports = {
  loadRegistroMedicina: (req, res) => {
    function fetchMedicineTypes(callback) {
      var query =
        'SELECT id_Presentacion, nombrePresentacion ' +
        'FROM presentacion_medicina';

      connection.query(query, function(error, results, fields) {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, results);
        }
      });
    }

    fetchMedicineTypes(function(error, results) {
      if (error) {
        return res.status(500).send(error);
      } else {
        res.render('registro-medicina.ejs', {
          tipos: results,
          titulo: 'Registro de medicina & receta',
          status: true,
          message: 'Éxito'
        });
      }
    });
  },

  loadMedicina: (req, res) => {
    var current_user = req.session.userid;
    var query =
      'SELECT * ' +
      'FROM receta a ' +
      'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
      'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion ' +
      'WHERE a.username_Paciente = ?';

    connection.query(query, [current_user], function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else {
        res.render('modulo-medicina.ejs', {
          listaMedicinas: results,
          titulo: 'Panel de Medicina',
          status: true,
          message: 'Éxito'
        });
      }
    });
  },

  // Se añade tanto la medicina como su receta
  agregarMedicina: (req, res) => {
    var total;

    if (req.body.total_ml == '' || req.body.total_ml == null) {
      total = req.body.numero_tabletas * req.body.mg_individual; // Calcular gramaje si son pastillas
    } else {
      total = req.body.total_ml;
    }

    var medicina = {
      nombreMedicina: req.body.nombre_medicina,
      tipoMedicina: req.body.tipo_medicina,
      gramosTotales: total,
      gramosPorPresentacion: req.body.mg_individual,
      cantidadDePresentacion: req.body.numero_tabletas
    };

    // Manejando la transacción
    connection.beginTransaction(function(error) {
      if (error) {
        return res.status(500).send(error);
      }

      connection.query('INSERT INTO medicina SET ?', medicina, function(
        error,
        results,
        fields
      ) {
        if (error) {
          connection.rollback(function() {
            return res.status(500).send(error);
          });
        }

        insertedId = results.insertId;

        var receta = {
          username_Paciente: req.session.userid,
          id_Medicina: insertedId,
          cantidadConsumo: req.body.consumir_ml,
          tabletasConsumo: req.body.consumir_tabletas,
          frecuenciaHoraDosis: req.body.horas_receta,
          diasDosis: req.body.dias_receta
        };

        connection.query('INSERT INTO receta SET ?', receta, function(
          error,
          results,
          fields
        ) {
          if (error) {
            connection.rollback(function() {
              return res.status(500).send(error);
            });
          }
          connection.commit(function(error) {
            if (error) {
              connection.rollback(function() {
                return res.status(500).send(error);
              });
            }
            // Success
            res.redirect('/medicine-list');
          });
        });
      });
    });
  },

  editarMedicina: (req, res) => {
    var totalNew;

    if (req.body.total_ml == '' || req.body.total_ml == null) {
      totalNew = req.body.numero_tabletas * req.body.mg_individual; // Calcular gramaje si son pastillas
    } else {
      totalNew = req.body.total_ml;
    }

    var medicina = {
      nombreMedicina: req.body.nombre_medicina,
      tipoMedicina: req.body.tipo_medicina,
      gramosTotales: totalNew,
      gramosPorPresentacion: req.body.mg_individual,
      cantidadDePresentacion: req.body.numero_tabletas
    };

    console.log(req.params.id);

    var idMedicinaElegida = req.params.id;
    var updatedId;

    // Manejando la transacción
    connection.beginTransaction(function(error) {
      if (error) {
        return res.status(500).send(error);
      }

      query1 = 'UPDATE medicina SET ? WHERE id_Medicina=?';

      connection.query(query1, [medicina, idMedicinaElegida], function(
        error,
        results,
        fields
      ) {
        if (error) {
          connection.rollback(function() {
            return res.status(500).send(error);
          });
        } else {
          updatedId = results.insertId;
        }

        var receta = {
          username_Paciente: req.session.userid,
          id_Medicina: updatedId,
          cantidadConsumo: req.body.consumir_ml,
          tabletasConsumo: req.body.consumir_tabletas,
          frecuenciaHoraDosis: req.body.horas_receta,
          diasDosis: req.body.dias_receta
        };

        connection.query(
          'UPDATE receta SET ? WHERE id_Medicina=?',
          [receta, updatedId],
          function(error, results, fields) {
            if (error) {
              connection.rollback(function() {
                return res.status(500).send(error);
              });
            }
            connection.commit(function(error) {
              if (error) {
                connection.rollback(function() {
                  return res.status(500).send(error);
                });
              }

              // Success
              res.redirect('/medicine-list');
            });
          }
        );
      });
    });
  },

  loadEdicionMedicina: (req, res) => {
    function fetchMedicineTypes(callback) {
      var query0 =
        'SELECT id_Presentacion, nombrePresentacion ' +
        'FROM presentacion_medicina';

      connection.query(query0, function(error, results, fields) {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, results);
        }
      });
    }

    var medicine_id = req.params.id;

    var query =
      'SELECT * ' +
      'FROM receta a ' +
      'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
      'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion ' +
      'WHERE a.id_Medicina = ?';

    var medicinaSeleccionada;
    var listaMedicinas;

    connection.query(query, [medicine_id], function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else {
        medicinaSeleccionada = results[0];
        fetchMedicineTypes(function(error, results2) {
          if (error) {
            return res.status(500).send(error);
          } else {
            listaMedicinas = results2;

            res.render('edicion-medicina.ejs', {
              selectedtype: results[0].tipoMedicina,
              tipos: listaMedicinas,
              medicina: medicinaSeleccionada,
              titulo: 'Edición de medicina y receta',
              status: true,
              message: 'Éxito'
            });
          }
        });
      }
    });
  },

  eliminarMedicina: (req, res) => {
    var medicine_id = req.params.id;
    var query =
      'DELETE r, m ' +
      'FROM receta r ' +
      'JOIN medicina m ON r.id_Medicina = m.id_Medicina ' +
      'WHERE r.id_Medicina = ?';

    connection.query(query, [medicine_id], function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else {
        // RE-Query to display medicine list again on the render
        var current_user = req.session.userid;
        var query2 =
          'SELECT * ' +
          'FROM receta a ' +
          'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
          'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion ' +
          'WHERE a.username_Paciente = ?';

        connection.query(query2, [current_user], function(
          error,
          results,
          fields
        ) {
          if (error) {
            return res.status(500).send(error);
          } else {
            res.render('modulo-medicina.ejs', {
              listaMedicinas: results,
              titulo: 'Panel de Medicina',
              status: true,
              message: 'Éxito'
            });
          }
        });
      }
    });
  }
};
