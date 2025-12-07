"use strict";
const express = require("express");
const pool = require("../../db/db.js");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM concesionario";
    pool.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: err });
      } else {
        res.render("forms/dealership_form", {
          dealerships: results,
          success: req.flash("success"),
          error: req.flash("error"),
        });
      }
    });
  })
  .post((req, res) => {
    const { nombre, telefono, ciudad, calle, numero, codigo_postal } = req.body;

    const address_query =
      "INSERT INTO direccion (ciudad, calle, numero, codigo_postal) VALUES (?,?,?,?)";

    pool.query(
      address_query,
      [ciudad, calle, numero, codigo_postal],
      (err, address_result) => {
        if (err) {
          console.error(err);
          req.flash("error", "Error al crear concesionario");
          return res.redirect("/admin/concesionarios");
        }

        const address_id = address_result.insertId;
        const dealership_query =
          "INSERT INTO concesionario (nombre, telefono, direccion_id) VALUES (?,?,?)";

        pool.query(dealership_query, [nombre, telefono, address_id], (err) => {
          if (err) {
            console.error(err);
            req.flash("error", "Error al crear concesionario");
            return res.redirect("/admin/concesionarios");
          }

          req.flash("success", "Concesionario agregado con exito");
          res.redirect("/admin/concesionarios");
        });
      },
    );
  });

module.exports = router;
