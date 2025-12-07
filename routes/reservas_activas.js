"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM reserva WHERE estado = 'activa' ";

  pool.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al consultar la base de datos" });
    } else {
      console.log(result);
      res.render("reservas_activas", { reservations: result });
    }
  });
});

module.exports = router;
