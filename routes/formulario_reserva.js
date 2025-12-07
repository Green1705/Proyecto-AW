"use strict";

const express = require("express");
const path = require("path");
const pool = require("../db/db.js");

const router = express.Router();

router.post("/", (req, res) => {
  const {
    id_usuario,
    id_automovil,
    nombre_cliente,
    apellido_paterno,
    apellido_materno,
    dni,
    telefono,
    fecha_inicio,
    fecha_fin,
    precio_final,
    notas,
  } = req.body;

  const insertReservaQuery = `
    INSERT INTO reserva 
    (id_usuario, id_automovil, nombre_cliente, apellido_paterno, apellido_materno, dni, telefono, fecha_inicio, fecha_fin, precio_final, notas) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const updateCarQuery = `
    UPDATE automovil 
    SET estado = 'reservado'
    WHERE id_automovil = ?
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      req.flash("error", "Error de conexión con la base de datos");
      return res.redirect("/vehiculos");
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        req.flash("error", "No se pudo iniciar la transacción");
        return res.redirect("/vehiculos");
      }

      connection.query(
        insertReservaQuery,
        [
          id_usuario,
          id_automovil,
          nombre_cliente,
          apellido_paterno,
          apellido_materno,
          dni,
          telefono,
          fecha_inicio,
          fecha_fin,
          precio_final,
          notas,
        ],
        (err, result) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
            });
            req.flash("error", "Error al crear la reserva");
            return res.redirect("/vehiculos");
          }

          connection.query(updateCarQuery, [id_automovil], (err2, result2) => {
            if (err2) {
              connection.rollback(() => {
                connection.release();
              });
              req.flash("error", "La reserva no pudo completarse");
              return res.redirect("/vehiculos");
            }

            connection.commit((err3) => {
              connection.release();

              if (err3) {
                req.flash("error", "Error al confirmar la transacción");
                return res.redirect("/vehiculos");
              }

              req.flash("success", "Reserva realizada correctamente");
              return res.redirect("/vehiculos");
            });
          });
        },
      );
    });
  });
});

module.exports = router;
