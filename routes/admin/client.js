"use strict";

const express = require("express");
const { getClients, addClient } = require("../../data/store.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/client_form", {
      clients: getClients(),
      success: req.flash("success"),
      error: req.flash("error"),
    });
  })
  .post((req, res) => {
    const { nombre, apellido_paterno, apellido_materno, dni, telefono, email } =
      req.body;

    addClient({
      nombre,
      apellido_paterno,
      apellido_materno,
      dni,
      telefono,
      email,
    });

    req.flash("success", "Cliente agregado con éxito");
    res.redirect("/admin/clientes");
  });

module.exports = router;
