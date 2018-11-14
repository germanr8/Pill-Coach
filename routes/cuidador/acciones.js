var connection = require('./../../config');

module.exports = {
  loadRelatedPatients: (req, res) => {
    var current_user = req.session.userid;

    var query =
      'SELECT DISTINCT a.nombre_completo, a.username ' +
      'FROM user a ' +
      'INNER JOIN paciente_cuidador b ON a.username = b.username_Paciente ' +
      'WHERE b.username_Cuidador = ?';

    connection.query(query, [current_user], function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else {
        if (results.length > 0) {
          res.render('lista-medicinas-cuidador.ejs', {
            pacientes: results,
            titulo: 'Panel de Medicina',
            status: true,
            message: ''
          });
        } else {
          res.render('lista-medicinas-cuidador.ejs', {
            pacientes: results,
            titulo: 'Panel de Medicina',
            status: true,
            message:
              'No tiene a cargo ningún paciente ni familiar. Para enlazarse con uno, pídale a su paciente o familiar que lo haga en su modulo de "Enlazar paciente/familiar.'
          });
        }
      }
    });
  },

  loadMedicineFromPatient: (req, res) => {
    var pacienteElegido = req.params.id;
    var query =
      'SELECT * ' +
      'FROM receta a ' +
      'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
      'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion ' +
      'WHERE a.username_Paciente = ?';

    connection.query(query, [pacienteElegido], function(
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(500).send(error);
      } else {
        res.render('modulo-medicina-cuidador.ejs', {
          listaMedicinas: results,
          titulo: 'Panel de Medicina',
          status: true,
          message: 'Éxito'
        });
      }
    });
  }
};
