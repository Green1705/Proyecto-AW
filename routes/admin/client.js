"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM cliente";
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/cars_form", {
          clients: results,
          success: req.flash("success"),
          error: req.flash("error"),
        });
      }
    });
  })
  .post((req, res) => {
    const { nombre, apellido_paterno, apellido_materno, dni, telefono, email } =
      req.body;
    const query =
      "INSERT INTO cliente (nombre, apellido_paterno, apellido_materno, dni, telefono, email) VALUES (?,?,?,?,?,?)";
    pool.query(
      query,
      [nombre, apellido_paterno, apellido_materno, dni, telefono, email],
      (err, result) => {
        if (err) {
          req.flash("error", "Error al crear cliente");
          res.redirect("admin/clientes");
        } else {
          req.flash("success", "Cliente agregado con éxito");
          res.redirect("admin/clientes");
        }
      },
    );
  });

module.exports = router;
