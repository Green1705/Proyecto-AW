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

    const datasets = {
      direcciones: Array.isArray(payload.direcciones) ? payload.direcciones : [],
      concesionarios: Array.isArray(payload.concesionarios) ? payload.concesionarios : [],
      usuarios: Array.isArray(payload.usuarios) ? payload.usuarios : [],
      automoviles: Array.isArray(payload.automoviles) ? payload.automoviles : [],
      reservas: Array.isArray(payload.reservas) ? payload.reservas : [],
    };

    const TABLE_CONFIG = [
      {
        key: "direcciones",
        label: "Dirección",
        table: "direccion",
        columns: ["id_direccion", "ciudad", "calle", "numero", "codigo_postal"],
        required: ["id_direccion", "ciudad", "calle", "numero"],
      },
      {
        key: "concesionarios",
        label: "Concesionario",
        table: "concesionario",
        columns: ["id_concesionario", "nombre", "telefono", "direccion_id"],
        required: ["id_concesionario", "nombre", "telefono", "direccion_id"],
      },
      {
        key: "usuarios",
        label: "Usuario",
        table: "usuario",
        columns: [
          "id_usuario",
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "rol",
          "email",
          "password",
          "telefono",
          "contraste",
          "tamanio_texto",
          "id_concesionario",
        ],
        required: [
          "id_usuario",
          "nombre",
          "apellido_paterno",
          "rol",
          "email",
          "password",
          "telefono",
          "id_concesionario",
        ],
      },
      {
        key: "automoviles",
        label: "Automóvil",
        table: "automovil",
        columns: [
          "id_automovil",
          "matricula",
          "marca",
          "modelo",
          "anio_matriculacion",
          "numero_plazas",
          "autonomia_km",
          "precio_por_dia",
          "color",
          "imagen",
          "estado",
          "id_concesionario",
        ],
        required: [
          "id_automovil",
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
        ],
      },
      {
        key: "reservas",
        label: "Reserva",
        table: "reserva",
        columns: [
          "id_reserva",
          "id_usuario",
          "id_automovil",
          "nombre_cliente",
          "apellido_paterno",
          "apellido_materno",
          "dni",
          "telefono",
          "fecha_inicio",
          "fecha_fin",
          "precio_final",
          "notas",
          "estado",
        ],
        required: [
          "id_reserva",
          "id_usuario",
          "id_automovil",
          "nombre_cliente",
          "apellido_paterno",
          "dni",
          "telefono",
          "fecha_inicio",
          "fecha_fin",
          "precio_final",
        ],
      },
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
      TABLE_CONFIG.forEach(({ key, required, label }) => {
        datasets[key].forEach((item, index) => ensureFields(item, required, label, index));
      });

      connection = await promisePool.getConnection();
      await connection.beginTransaction();

      for (const { key, table, columns } of TABLE_CONFIG) {
        const entries = datasets[key];
        if (!entries.length) continue;
        const placeholders = `(${columns.map(() => "?").join(",")})`;
        const sql = `INSERT INTO ${table} (${columns.join(",")}) VALUES ${placeholders}`;
        for (const entry of entries) {
          const values = columns.map((col) =>
            Object.prototype.hasOwnProperty.call(entry, col) ? entry[col] : null,
          );
          await connection.execute(sql, values);
        }
      }

      await connection.commit();
      const summary = TABLE_CONFIG.map(({ key, label }) => `${label}s: ${datasets[key].length}`).join(", ");
      req.flash("success", `Importación completada (${summary}).`);
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
