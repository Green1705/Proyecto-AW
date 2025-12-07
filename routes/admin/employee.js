"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();
const dealersQuery = "SELECT id_concesionario, nombre FROM concesionario";

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM usuario";
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        pool.query(dealersQuery, (err2, dealers) => {
          if (err2) {
            res.status(500).json({ message: err2 });
          } else {
            res.render("forms/employee_form", {
              employees: results,
              dealerships: dealers,
              success: req.flash("success"),
              error: req.flash("error"),
            });
          }
        });
      }
    });
  })
  .post((req, res) => {
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
      "INSERT INTO usuario (nombre, apellido_paterno, apellido_materno, rol, email, password, telefono, id_concesionario) values (?,?,?,?,?,?,?,?)";

    pool.query(
      query,
      [
        nombre,
        apellido_paterno,
        apellido_materno || null,
        rol,
        email,
        password,
        telefono,
        id_concesionario,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
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
