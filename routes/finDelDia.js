var connection = require('../config');

module.exports = {
  restartMedicineConsumptionCounter: (req, res) => {
    var current_user = req.session.userid;
    var query = 'UPDATE medicina SET vecesTomadaDia = DEFAULT';

    connection.query(query, function(error, results, fields) {
      if (error) {
        return res.status(500).send(error);
      } else {
        console.log(results);
        res.render('modulo-agenda.ejs', {
          listaMedicinas: results,
          titulo: 'Panel de agenda',
          status: true,
          message: 'Éxito'
        });
      }
    });
  }
};
