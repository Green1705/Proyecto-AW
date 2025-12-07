"use strict";

const express = require("express");
const isAdmin = require("../../middlewares/is_admin.js");

const router = express.Router();

//changed to get temporarily
router.get("/", (req, res) => {
  res.render("admin_panel");
});
router.use("/vehiculos", require("./cars.js"));
router.use("/concesionarios", isAdmin, require("./dealership.js"));
router.use("/empleados", isAdmin, require("./employee.js"));

module.exports = router;
