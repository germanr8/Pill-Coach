var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');

var connection = require('./config');
var app = express();

var autenticarController = require('./controllers/autenticar-controller');
var registroController = require('./controllers/registro-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "./html/index.html");
})

app.get('/sign-up', function (req, res) {
    res.sendFile(__dirname + "/" + "./html/sign-up.html");
})

app.get('/dashboard-paciente', function (req, res) {
    res.sendFile(__dirname + "/" + "./html/dashboard-paciente.html");
})

/* route to handle login and registration */
app.post('/api/registro', registroController.registro);
app.post('/api/autenticar', autenticarController.autenticar);

console.log(autenticarController);
app.post('/controllers/registro-controller', registroController.registro);
app.post('/controllers/autenticar-controller', autenticarController.autenticar);


app.listen(8012);
