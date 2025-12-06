"use strict";

const express = require("express");
const isAdmin = require("../../middlewares/is_admin.js");

const router = express.Router();

router.use("/", isAdmin, (req, res) => {
  res.render("admin_panel");
});
router.use("/vehiculos", isAdmin, require("./cars.js"));
router.use("/concesionarios", isAdmin, require("./dealership.js"));
router.use("/empleados", isAdmin, require("./employee.js"));
router.use("/clientes", require("./client.js"));

module.exports = router;
