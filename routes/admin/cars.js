"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM automovil";
    pool.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/cars_form", {
          cars: result,
          success: req.flash("success"),
          error: req.flash("error"),
        });
      }
    });
  })
  .post((req, res) => {
    const {
      matricula,
      marca,
      modelo,
      anio_matriculacion,
      numero_plazas,
      autonomia_km,
      precio_por_dia,
      color,
      imagen,
      estado,
      id_concesionario,
    } = req.body;

    const query =
      "INSERT INTO automovil (matricula, marca, modelo, anio_matriculacion, numero_plazas, autonomia_km, precio_por_dia, color, imagen, estado, id_concesionario) VALUES (?,?,?,?,?,?,?,?,?,?,)";

    pool.query(
      query,
      [
        matricula,
        marca,
        modelo,
        anio_matriculacion,
        numero_plazas,
        autonomia_km,
        precio_por_dia,
        color,
        imagen,
        estado,
        id_concesionario,
      ],
      (err, result) => {
        if (err) {
          req.flash("error", "Error al crear vehiculo");
          res.redirect("/admin/vehiculos");
        } else {
          req.flash("success", "Vehiculo creado correctamente");
          res.redirect("/admin/vehiculos");
        }
      },
    );
  });

//TODO add the route to handle(alter) individual car details
//
module.exports = router;
