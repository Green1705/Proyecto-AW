"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM cocesionario";
    pool.query(query, (err, results) => {
      if (err) {
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
  .post(async (req, res) => {
    //TODO add a new dealership to the database
    const { nombre, telefono, ciudad, calle, numero, codigo_postal } = req.body;

    try {
      const address_query =
        "INSERT INTO direccion (ciudad, calle , numero, codigo_postal) VALUES (?,?,?,?)";
      const address_result = await pool.execute(address_query, [
        ciudad,
        calle,
        numero,
        codigo_postal,
      ]);

      const address_id = address_result.insertId;
      const dealership_query =
        "INSERT INTO concesionario (nombre, telefono, direccion_id) VALUES (?,?,?) ";

      await pool.execute(dealership_query, [nombre, telefono, address_id]);

      req.flash("success", "Concesionario agregado con exito");
      res.redirect("/admin/vehiculos");
    } catch (error) {
      req.flash("error", "Error al crear concesionario");
      res.redirect("/admin/vehiculos");
    }
  });

module.exports = router;
