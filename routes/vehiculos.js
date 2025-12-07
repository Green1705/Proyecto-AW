"use strict";

const express = require("express");
const { getVehicles, getDealerships } = require("../data/store.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const dealershipMap = getDealerships().reduce((map, dealership) => {
      map[dealership.id_concesionario] = dealership.nombre;
      return map;
    }, {});

    res.render("vehiculos", {
      cars: getVehicles(),
      dealershipMap,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  })
  .post((req, res) => {});

// router.get("/:id", (req, res) => {
//   res.render("users/profile", { vehiculoId: req.params.id });
// });

module.exports = router;
