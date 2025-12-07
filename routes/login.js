"use strict";

const express = require("express");
const { findUserByEmail } = require("../data/store.js");

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
    const user = findUserByEmail(req.body.email);
    if (user && user.password === req.body.password) {
      req.session.userId = user.id_usuario;
      req.session.name = user.nombre;
      req.session.lastName = [user.apellido_paterno, user.apellido_materno]
        .filter(Boolean)
        .join(" ");
      req.session.isLoggedIn = true;
      req.session.isAdmin = user.rol === "administrador";

      req.flash("success", "Se ha iniciado sesión correctamente");
      res.redirect("/");
    } else {
      req.flash("error", "Correo o contraseña incorrectos");
      res.redirect("/");
    }
  });

module.exports = router;
