"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  const userId = req.session && req.session.userId;
  if (!userId) {
    req.flash("error", "Debes iniciar sesión para ver tu perfil");
    return res.redirect("/login");
  }

  const query =
    "SELECT r.*, a.matricula FROM reserva AS r LEFT JOIN automovil AS a ON r.id_automovil = a.id_automovil WHERE r.estado <> 'activa' AND r.id_usuario = ? ORDER BY r.fecha_fin DESC";

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      req.flash("error", "No se pudieron cargar tus reservas");
      return res.redirect("/");
    }

    res.render("profile", {
      reservations: result || [],
    });
  });
});

module.exports = router;
