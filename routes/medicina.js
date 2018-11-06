module.exports = {

    // Se añade tanto la medicina como su receta
    aniadirMedicina: (req, res) => {
        var medicina = {
            "nombre": req.body.nombre_medicina,
            "tipoMedicina": req.body.tipo_medicina,
            "gramosTotales": req.body.gramos_totales,
            "gramosPorPresentacion": req.body.gramos_presentacion,
            "cantidadDePresentacion": req.body.cantidad_presentacion
        }

        var medicina = {
            "id_Medicina": req.body.usuario,
            "nombre": req.body.nombre_medicina,
            "tipoMedicina": req.body.tipo_medicina,
            "gramosTotales": req.body.gramos_totales,
            "gramosPorPresentacion": req.body.gramos_presentacion,
            "cantidadDePresentacion": req.body.cantidad_presentacion
        }


        connection.query('INSERT INTO medicina SET ?', medicina, function (error, results, fields) {
            if (err) {
                return res.status(500).send(err);
            }


        });
    },

    editarMedicina: (req, res) => {

    },

    verMedicina: (req, res) => {

    },

    eliminarMedicina: (req, res) => {

    }
};