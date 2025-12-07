"use strict";

const express = require("express");
const path = require("path");
const pool = require("../db/db.js");

const router = express.Router();

router.post("/", (req, res) => {
  const {
    id_usuario,
    id_automovil,
    id_cliente,
    fecha_inicio,
    fecha_fin,
    precio_final,
    notas,
  } = req.body;

  const query =
    "INSERT INTO reserva (id_usuario, id_automovil, id_cliente, fecha_inicio, fecha_fin, precio_final, notas) values (?,?,?,?,?,?,?)";

  pool.query(query, (err, result) => {
    if (err) {
      req.flash("error", "Error al realizar la reserva");
      res.redirect("/vehiculos");
    } else {
      req.flash("success", "Reserva realizada correctamente");
      res.redirect("/vehiculos");
    }
  });
});

module.exports = router;
