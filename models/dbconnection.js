// const mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'sql12.freemysqlhosting.net',
//     user: 'sql12380579',
//     password: 'B9kPyq2UFy',
//     database: 'sql12380579'
// })

// connection.connect((error) => {
//     if (error) throw error;
// });

// module.exports = connection;

const Pool = require("pg").Pool;
const SSL = process.env.NODE_ENV === "production";
var connection;
if (!SSL) {
  connection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hms_db",
    password: "tf110500",
    port: 5432,
  });
} else {
  connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

module.exports = connection;
