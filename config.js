var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pill-coach'
});

connection.connect(function(err) {
  if (!err) {
    console.log('Database connection succesful');
  } else {
    console.log('Database connection unsuccesful');
  }
});

module.exports = connection;
