"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router.route("/").post((req, res) => {
  const { id_reserva, id_automovil, estado } = req.body;
  const reservationQuery =
    "UPDATE reserva SET estado = ? WHERE id_reserva = ?;";
  const carQuery =
    "UPDATE automovil SET estado = 'disponible' WHERE id_automovil = ?";

  pool.query(reservationQuery, [estado, id_reserva], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al actualizar reserva" });
    } else {
      pool.query(carQuery, [id_automovil], (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error al actualizar reserva" });
        } else {
          req.flash("success", "Reserva finalizada correctamente");
          res.redirect("/reserva");
        }
      });
    }
  });
});

module.exports = router;
