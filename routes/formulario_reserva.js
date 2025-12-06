"use strict";

const express = require("express");
const path = require("path");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/reservation_form");
  })
  .post((req, res) => {
    //TODO handle form data

    // const query = "INSERT INTO reserva () values ()"
    console.log("Formulario recibido con metodo POST");
    res.redirect("/reserva"); // TODO agregar success template
  });

module.exports = router;
