"use strict";

const express = require("express");
const { getUsers, addUser } = require("../../data/store.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/employee_form", {
      employees: getUsers(),
      success: req.flash("success"),
      error: req.flash("error"),
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

    addUser({
      nombre,
      apellido_paterno,
      apellido_materno,
      rol: rol || "empleado",
      email,
      password,
      telefono,
      id_concesionario: Number(id_concesionario) || 1,
    });

    req.flash("success", "Empleado agregado con éxito");
    res.redirect("/admin/empleados");
  });

module.exports = router;
