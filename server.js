const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const port = 8012;
const app = express();

const { getHomePage } = require('./routes/index');
const { getSignupPage } = require('./routes/sign-up');
const { closeSession } = require('./routes/sign-out');
const {
  loadRegistroMedicina,
  loadMedicina,
  agregarMedicina,
  eliminarMedicina,
  editarMedicina,
  loadEdicionMedicina
} = require('./routes/paciente/medicina');
const {
  loadDailySchedule,
  consumeMedicine
} = require('./routes/paciente/agenda');
const {
  loadCalendar,
  loadSpecificDaySchedule
} = require('./routes/paciente/calendario');
const { loadLinkModule, generateLink } = require('./routes/paciente/enlace');
const {
  loadRelatedPatientsMedicine,
  loadMedicineFromPatient,
  loadRelatedPatientsSchedule,
  loadScheduleFromPatient
} = require('./routes/cuidador/acciones');

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

//******************* ROUTES PARA LA APLICACIÓN
app.get('/', getHomePage);
app.get('/sign-up', getSignupPage);
app.get('/medicine-list', loadMedicina);
app.get('/medicine-list/edit/:id', loadEdicionMedicina);
app.get('/medicine-list/delete/:id', eliminarMedicina);
app.get('/medicine-list/medicine-registry', loadRegistroMedicina);
app.get('/sign-out', closeSession);
app.get('/daily-schedule', loadDailySchedule);
app.get('/calendar', loadCalendar);
app.get('/calendar/:date', loadSpecificDaySchedule);
app.get('/daily-schedule/consume/:id', consumeMedicine);
app.get('/link/', loadLinkModule);
app.get('/see-medicine', loadRelatedPatientsMedicine);
app.get('/see-medicine/:id', loadMedicineFromPatient);
app.get('/see-schedule', loadRelatedPatientsSchedule);
app.get('/see-schedule/:id', loadScheduleFromPatient);

//******************* MANEJAR ACCIONES DE LOS POSTS (FORMS)
const autenticacion = require('./routes/autenticar');
const registro = require('./routes/registrar');

app.post('/authenticate', autenticacion.autenticar);
app.post('/register', registro.registrar);
app.post('/medicine-list/add', agregarMedicina);
app.post('/medicine-list/modify/:id', editarMedicina);
app.post('/link/generate', generateLink);

// La aplicación escuchara al puerto establecido
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
