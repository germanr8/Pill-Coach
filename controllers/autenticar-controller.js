var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');

module.exports.autenticar = function (req, res) {
    var usuario = req.body.usuario;
    var password = req.body.password;


    connection.query('SELECT * FROM user WHERE username = ?', [usuario], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'Error en el query.'
            })
        } else {
            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    res.json({
                        status: true,
                        message: 'Autenticación exitosa.'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email y contraseña no son correctas."
                    });
                }

            }
            else {
                res.json({
                    status: false,
                    message: "Email no existe."
                });
            }
        }
    });
}
