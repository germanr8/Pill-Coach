var connection = require('./../config');

module.exports = {
  loadMedicina: (req, res) => {
    var current_user = req.session.userid;
    var query1 =
      /*'SELECT * FROM receta ' +
      'LEFT JOIN medicina as t2 ' +
      'ON t1.id_Medicina = t2.id_Medicina ' +
      'JOIN medicina ' +
      'LEFT JOIN presentacion_medicina as t3 ' +
      'ON t2.tipoMedicina = t3.id_Presentacion ' +
      'WHERE username_Paciente = ? as t1';*/

      'SELECT * ' +
      'FROM receta a ' +
      'INNER JOIN medicina b ON a.id_Medicina = b.id_Medicina ' +
      'INNER JOIN presentacion_medicina c ON b.tipoMedicina  = c.id_Presentacion';

    connection.query(query1, [current_user], function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
        console.log(error);
      } else {
        res.render('modulo-medicina.ejs', {
          listaMedicinas: results,
          titulo: 'Panel de Medicina',
          user: current_user,
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

  eliminarMedicina: (req, res) => {}
};
