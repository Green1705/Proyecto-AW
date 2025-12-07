"use strict";

const express = require("express");
const { getDealerships, addDealership } = require("../../data/store.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/dealership_form", {
      dealerships: getDealerships(),
      success: req.flash("success"),
      error: req.flash("error"),
    });
  })
  .post((req, res) => {
    const { nombre, telefono, ciudad, calle, numero, codigo_postal } = req.body;

    addDealership({
      nombre,
      telefono,
      direccion: {
        ciudad,
        calle,
        numero: Number(numero) || 0,
        codigo_postal: Number(codigo_postal) || null,
      },
    });

    req.flash("success", "Concesionario agregado con éxito");
    res.redirect("/admin/concesionarios");
  });

module.exports = router;
