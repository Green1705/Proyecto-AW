"use strict";

const express = require("express");
const path = require("path");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    //TODO
    res.sendFile(path.join(__dirname, "../public/reservation_form.html"));
  })
  .post((req, res) => {
    //TODO handle form data
    console.log("Formulario recibido con metodo POST");
    res.redirect("/reserva"); // TODO agregar success template
  });

module.exports = router;
