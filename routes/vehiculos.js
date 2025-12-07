"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    if (req.session.isAdmin) {
      var query = "SELECT * FROM automovil";
    } else {
      var query =
        "SELECT * FROM automovil WHERE id_concesionario =" +
        req.session.dealershipId +
        ";";
    }
    pool.query(query, (err, result) => {
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
