"use strict";

const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
  res.render("vehiculos", { vehiculos: [] });
});

// router.get("/:id", (req, res) => {
//   res.render("users/profile", { vehiculoId: req.params.id });
// });

module.exports = router;
