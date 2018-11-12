const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const port = 8012;
const app = express();

const { getHomePage } = require('./routes/index');
const { getSignupPage } = require('./routes/sign-up');
const {
  loadRegistroMedicina,
  loadMedicina,
  agregarMedicina,
  eliminarMedicina,
  editarMedicina,
  loadEdicionMedicina
} = require('./routes/medicina');

//const agregarMedicina = require('./routes/medicina');
// CREAR LA CONEXIÓN DE LA BASE DE DATOS
const connection = require('./config');

//******************* CONFIGURACIÓN DEL MIDDLEWARE
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      userid: null,
      secure: false,
      httpOnly: true
    }
  })
);
app.set('port', process.env.port || port); // Express usara este puerto
app.set('views', __dirname + '/views'); // Express buscará en este folder para renderizar los views
app.set('view engine', 'ejs'); // Se configura EJS (el template engine)
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Se parsearán los datos de los 'forms'
app.use(express.static(path.join(__dirname, 'public'))); // Para que Express use el folder 'public'

app.use(function(req, res, next) {
  res.locals = {
    siteTitle: "My Website's Title",
    pageTitle: 'The Home Page',
    author: 'Cory Gross',
    description: "My app's description"
  };
  next();
});

//******************* ROUTES PARA LA APLICACIÓN
app.get('/', getHomePage);
app.get('/sign-up', getSignupPage);
app.get('/medicine-list', loadMedicina);
app.get('/medicine-list/edit/:id', loadEdicionMedicina);
app.get('/medicine-list/delete/:id', eliminarMedicina);
app.get('/medicine-list/medicine-registry', loadRegistroMedicina);

//******************* MANEJAR ACCIONES DE LOS POSTS (FORMS)
const autenticacion = require('./routes/autenticar');
const registro = require('./routes/registrar');

app.post('/authenticate', autenticacion.autenticar);
app.post('/register', registro.registrar);
app.post('/medicine-list/add', agregarMedicina);
app.post('/medicine-list/modify/:id', editarMedicina);

// La aplicación escuchara al puerto establecido
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
