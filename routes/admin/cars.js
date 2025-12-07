"use strict";

const express = require("express");
const { getVehicles, addVehicle } = require("../../data/store.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/cars_form", {
      cars: getVehicles(),
      success: req.flash("success"),
      error: req.flash("error"),
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

    addVehicle({
      matricula,
      marca,
      modelo,
      anio_matriculacion: Number(anio_matriculacion) || new Date().getFullYear(),
      numero_plazas: Number(numero_plazas) || 4,
      autonomia_km: autonomia_km ? Number(autonomia_km) : null,
      precio_por_dia: Number(precio_por_dia) || 0,
      color,
      imagen,
      estado: estado || "disponible",
      id_concesionario: Number(id_concesionario) || 1,
    });

    req.flash("success", "Vehículo creado correctamente");
    res.redirect("/admin/vehiculos");
  });

module.exports = router;
