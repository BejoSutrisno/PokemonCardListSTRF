const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',      // XAMPP MySQL default
  user: 'root',           // user default XAMPP
  password: '',           // password default biasanya kosong
  database: 'pokemon_db'  // nama database
});

module.exports = db;