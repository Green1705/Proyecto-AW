"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    let params = [];
    if (req.session.isAdmin) {
      var query =
        "SELECT a.*, c.nombre AS concesionario_nombre FROM automovil AS a LEFT JOIN concesionario AS c ON a.id_concesionario=a.id_concesionario";
    } else {
      var query =
        "SELECT a.*, c.nombre AS concesionario_nombre FROM automovil AS a LEFT JOIN concesionario AS c ON a.id_concesionario=a.id_concesionario WHERE a.id_concesionario = ? ";
      params.push(req.session.dealershipId);
    }
    pool.query(query, params, (err, result) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("vehiculos", {
          cars: result,
          success: req.flash("success"),
          error: req.flash("error"),
        });
      }
    });
  })
  .post((req, res) => {});

// router.get("/:id", (req, res) => {
//   res.render("users/profile", { vehiculoId: req.params.id });
// });

module.exports = router;
