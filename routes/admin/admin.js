"use strict";

const express = require("express");
const multer = require("multer");
const pool = require("../../db/db.js");
const isAdmin = require("../../middlewares/is_admin.js");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });
const promisePool = pool.promise();

//changed to get temporarily
router.get("/", (req, res) => {
  res.render("admin_panel", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
});

router.post(
  "/import-json",
  isAdmin,
  upload.single("dataFile"),
  async (req, res) => {
    const redirectToPanel = () => res.redirect("/admin");
    if (!req.file) {
      req.flash("error", "Debes seleccionar un archivo JSON.");
      return redirectToPanel();
    }

    let payload;
    try {
      payload = JSON.parse(req.file.buffer.toString("utf8"));
    } catch {
      req.flash("error", "El archivo no contiene un JSON válido.");
      return redirectToPanel();
    }

    if (!payload || typeof payload !== "object") {
      req.flash("error", "El JSON de importación es inválido.");
      return redirectToPanel();
    }

    const { concesionarios, automoviles } = payload;
    if (!Array.isArray(concesionarios) || !Array.isArray(automoviles)) {
      req.flash(
        "error",
        "El JSON debe incluir los arreglos 'concesionarios' y 'automoviles'.",
      );
      return redirectToPanel();
    }

    const REQUIRED_DEALERSHIP_FIELDS = ["nombre", "telefono", "direccion_id"];
    const REQUIRED_CAR_FIELDS = [
      "matricula",
      "marca",
      "modelo",
      "anio_matriculacion",
      "numero_plazas",
      "autonomia_km",
      "precio_por_dia",
      "color",
      "estado",
      "id_concesionario",
    ];

    const ensureFields = (entry, required, label, index) => {
      required.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(entry, field)) {
          throw new Error(
            `${label} #${index + 1} no contiene el campo obligatorio '${field}'.`,
          );
        }
      });
    };

    let connection;
    try {
      concesionarios.forEach((dealer, index) =>
        ensureFields(dealer, REQUIRED_DEALERSHIP_FIELDS, "Concesionario", index),
      );
      automoviles.forEach((car, index) =>
        ensureFields(car, REQUIRED_CAR_FIELDS, "Automóvil", index),
      );

      connection = await promisePool.getConnection();
      await connection.beginTransaction();

      for (const dealer of concesionarios) {
        await connection.execute(
          "INSERT INTO concesionario (nombre, telefono, direccion_id) VALUES (?, ?, ?)",
          [dealer.nombre, dealer.telefono, dealer.direccion_id],
        );
      }

      for (const car of automoviles) {
        await connection.execute(
          "INSERT INTO automovil (matricula, marca, modelo, anio_matriculacion, numero_plazas, autonomia_km, precio_por_dia, color, imagen, estado, id_concesionario) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          [
            car.matricula,
            car.marca,
            car.modelo,
            car.anio_matriculacion,
            car.numero_plazas,
            car.autonomia_km,
            car.precio_por_dia,
            car.color,
            car.imagen || null,
            car.estado,
            car.id_concesionario,
          ],
        );
      }

      await connection.commit();
      req.flash(
        "success",
        `Importación completada (${concesionarios.length} concesionarios y ${automoviles.length} automóviles).`,
      );
    } catch (error) {
      if (connection) {
        try {
          await connection.rollback();
        } catch {
          // ignore rollback errors
        }
      }
      req.flash("error", error.message || "No se pudo importar el JSON.");
    } finally {
      if (connection) connection.release();
    }

    return redirectToPanel();
  },
);

router.use("/vehiculos", require("./cars.js"));
router.use("/concesionarios", isAdmin, require("./dealership.js"));
router.use("/empleados", isAdmin, require("./employee.js"));

module.exports = router;
