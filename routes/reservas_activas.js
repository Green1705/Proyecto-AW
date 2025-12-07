"use strict";

const express = require("express");

const router = express.Router();

const dummyReservations = [
  {
    id_reserva: 1,
    id_usuario: 2,
    id_automovil: 1,
    matricula: "EV-001-MD",
    id_cliente: 101,
    cliente_nombre: "Laura Pérez",
    fecha_inicio: "2025-02-10 09:00",
    fecha_fin: "2025-02-12 18:00",
    estado: "activa",
    precio_final: 130,
    notas: null,
  },
  {
    id_reserva: 2,
    id_usuario: 3,
    id_automovil: 2,
    matricula: "EV-025-MD",
    id_cliente: 102,
    cliente_nombre: "Carlos Ruiz",
    fecha_inicio: "2025-02-11 08:30",
    fecha_fin: "2025-02-13 20:00",
    estado: "activa",
    precio_final: 240,
    notas: "Sin incidencias",
  },
];

router.get("/", (req, res) => {
  res.render("reservas_activas", { reservations: dummyReservations });
});

module.exports = router;
