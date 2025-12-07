"use strict";

const express = require("express");
const path = require("path");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("forms/login_form", {
      success: req.flash("success"),
      error: req.flash("error"),
    });
  })
  .post((req, res) => {
    const query =
      "SELECT id_usuario, nombre, apellido_paterno, apellido_materno, rol, email, password, id_concesionario FROM usuario WHERE email = ? AND password = ?";
    pool.query(query, [req.body.email, req.body.password], (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        if (results.length > 0) {
          let user = results[0];
          req.session.userId = user.id_usuario;
          req.session.name = user.nombre;
          req.session.lastName = [
            user.apellido_paterno,
            user.apellido_materno,
          ].join(" ");
          req.session.isLoggedIn = true;
          req.session.isAdmin = user.rol === "administrador";
          req.session.dealershipId = user.id_concesionario;

          req.flash("success", "Se ha iniciado sesión correctamente");
          res.redirect("/");
        } else {
          req.flash("error", "Correo o contraseña incorrectos");
          res.redirect("/");
        }
      }
    });
  });

module.exports = router;
