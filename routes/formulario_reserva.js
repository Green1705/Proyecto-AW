"use strict";

const express = require("express");
const { addReservation } = require("../data/store.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/reservation_form");
  })
  .post((req, res) => {
    const {
      id_usuario,
      id_automovil,
      id_cliente,
      fecha_inicio,
      fecha_fin,
      estado,
      precio_final,
      incidencias_reportadas,
    } = req.body;

    addReservation({
      id_usuario: Number(id_usuario) || null,
      id_automovil: Number(id_automovil) || null,
      id_cliente: Number(id_cliente) || null,
      fecha_inicio,
      fecha_fin,
      estado: estado || "activa",
      precio_final: Number(precio_final) || 0,
      incidencias_reportadas,
    });

    req.flash("success", "Reserva registrada correctamente");
    res.redirect("/vehiculos");
  });

module.exports = router;
