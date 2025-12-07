"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT r.*, a.matricula
    FROM reserva AS r
    LEFT JOIN automovil AS a ON r.id_automovil = a.id_automovil
    WHERE r.estado = 'activa'
  `;

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
