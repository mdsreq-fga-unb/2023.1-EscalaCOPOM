const mysql = require("mysql");
require("dotenv").config();

const createConnection = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return db;
};

exports.module = createConnection;
