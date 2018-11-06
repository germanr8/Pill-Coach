var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');

module.exports.autenticar = function (req, res) {
    var usuario = req.body.usuario;
    var passwordEncriptada = cryptr.encrypt(req.body.password);


    connection.query('SELECT * FROM user WHERE username = ?', [usuario], function (error, results, fields) {
        if (error) {
            res.render('index.ejs', {
                status: false,
                message: "Error en el query" + error
            });
        } else {
            if (results.length > 0) {
                if (cryptr.decrypt(passwordEncriptada) == cryptr.decrypt(results[0].contrasenia)) {
                    res.render('dashboard-paciente.ejs', {
                        status: true,
                        user: results[0].username,
                        nombre: results[0].name
                    });
                } else {
                    res.render('index.ejs', {
                        status: false,
                        message: "Usuario y contraseña no coinciden"
                    });
                }

            }
            else {
                res.render('index.ejs', {
                    status: false,
                    message: "Usuario no existe"
                });
            }
        }
    });
}
