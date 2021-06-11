const Pool = require("pg").Pool;
require("dotenv").config();
const SSL = process.env.NODE_ENV === "production";
var connection;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const connectionString = process.env.DATABASE_URL || `postgresql://${user}:${password}@${host}:${port}/${database}` //

if (!SSL) {
  connection = new Pool({
    connectionString,
  });
} else {
  connection = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
}

module.exports = connection;

