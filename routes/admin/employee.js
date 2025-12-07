"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM usuario";
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/employee_form", {
          employees: results,
          success: req.flash("success"),
          error: req.flash("error"),
        });
      }
    });
  })
  .post((req, res) => {
    //TODO add a new employee to the database
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      rol,
      email,
      password,
      telefono,
      id_concesionario,
    } = req.body;

    const query =
      "INSER INTO usuario (nombre, apellido_paterno, apellido_materno, rol, email, password, telefono, id_concesionario) values (?,?,?,?,?,?,?,?)";

    pool.query(
      query,
      [
        nombre,
        apellido_paterno,
        apellido_materno,
        rol,
        email,
        password,
        telefono,
        id_concesionario,
      ],
      (err, result) => {
        if (err) {
          req.flash("error", "Error al crear empleado");
          res.redirect("/admin/empleados");
        } else {
          req.flash("success", "Empleado agregado con éxito");
          res.redirect("/admin/empleados");
        }
      },
    );
  });

module.exports = router;
