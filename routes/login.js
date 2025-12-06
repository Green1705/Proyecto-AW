"use strict";

const express = require("express");
const path = require("path");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "../public/login_form.html"));
  })
  .post((req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error al conectarse a la base de datos" });
      } else {
        query =
          "SELECT id_usuario, rol, email, password FROM usuario WHERE email = ? AND password = ?";
        connection.query(
          query,
          [req.body.email, req.body.password],
          (err, results) => {
            connection.release();
            if (err) {
              res.status(500).json({ message: err });
            } else {
              if (results.length > 0) {
                let user = results[0];
                req.session.userId = user.id_usuario;
                req.session.isAuthenticated = true;
                if (user.rol == "administrador") {
                  req.session.isAdmin = true;
                } else {
                  req.session.isAdmin = false;
                }
                res.redirect("/");
              } else {
                res
                  .status(404)
                  .json({ message: "Email o contraseña incorrectos" });
              }
            }
          },
        );
      }
    });
  });

module.exports = router;
