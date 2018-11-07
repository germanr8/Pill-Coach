var connection = require('./../config');

module.exports = {
  loadMedicina: (req, res) => {
    var current_user = req.session.userid;
    var query =
      'SELECT * ' +
      'FROM receta a ' +
      'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
      'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion';

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
  aniadirMedicina: (req, res) => {
    var medicina = {
      nombre: req.body.nombre_medicina,
      tipoMedicina: req.body.tipo_medicina,
      gramosTotales: req.body.gramos_totales,
      gramosPorPresentacion: req.body.gramos_presentacion,
      cantidadDePresentacion: req.body.cantidad_presentacion
    };

    connection.query('INSERT INTO medicina SET ?', medicina, function(
      error,
      results,
      fields
    ) {
      if (error) {
        return res.status(500).send(error);
      } else {
      }
    });
  },

  editarMedicina: (req, res) => {},

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
          'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion';

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
