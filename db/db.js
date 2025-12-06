"use strict";

const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aplicaciones_web",
});

module.exports = pool;
