"use strict";

const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "diego",
  password: "diego123",
  database: "aplicaciones_web",
});

module.exports = pool;
