"use strict";

const express = require("express");
const pool = require("../../db/db.js");
const uploadImage = require("../../middlewares/uploadImage.js");

const router = express.Router();
const promisePool = pool.promise();

router
  .route("/")
  .get((req, res) => {
    const query =
      "SELECT a.*, c.nombre AS concesionario_nombre FROM automovil AS a LEFT JOIN concesionario AS c ON a.id_concesionario = c.id_concesionario";
    pool.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/cars_form", {
          cars: result,
          success: req.flash("success"),
          error: req.flash("error"),
        });
      }
    });
  })
  .post(uploadImage.single("imagen"), async (req, res) => {
    try {
      if (req.body.method && req.body.method.toUpperCase() === "PUT") {
        await handleUpdate(req, res);
      } else {
        await handleCreate(req, res);
      }
    } catch (error) {
      console.error(error);
      req.flash("error", "No se pudo procesar la solicitud.");
      res.redirect("/admin/vehiculos");
    }
  });

async function handleCreate(req, res) {
  if (!req.file) {
    req.flash("error", "Debes cargar una imagen para el vehículo.");
    return res.redirect("/admin/vehiculos");
  }

  const imagen = "/images/autos/" + req.file.filename;
  const {
    matricula,
    marca,
    modelo,
    anio_matriculacion,
    numero_plazas,
    autonomia_km,
    precio_por_dia,
    color,
    estado,
    id_concesionario,
  } = req.body;

  const query =
    "INSERT INTO automovil (matricula, marca, modelo, anio_matriculacion, numero_plazas, autonomia_km, precio_por_dia, color, imagen, estado, id_concesionario) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

  await promisePool.execute(query, [
    matricula,
    marca,
    modelo,
    anio_matriculacion,
    numero_plazas,
    autonomia_km,
    precio_por_dia,
    color,
    imagen,
    estado,
    id_concesionario,
  ]);

  req.flash("success", "Vehículo creado correctamente");
  res.redirect("/admin/vehiculos");
}

async function handleUpdate(req, res) {
  const {
    id_automovil,
    matricula,
    marca,
    modelo,
    anio_matriculacion,
    numero_plazas,
    autonomia_km,
    precio_por_dia,
    color,
    estado,
    id_concesionario,
  } = req.body;

  if (!id_automovil) {
    req.flash("error", "No se especificó el vehículo a modificar.");
    return res.redirect("/admin/vehiculos");
  }

  const [rows] = await promisePool.execute(
    "SELECT * FROM automovil WHERE id_automovil = ?",
    [id_automovil],
  );

  if (!rows.length) {
    req.flash("error", "El vehículo indicado no existe.");
    return res.redirect("/admin/vehiculos");
  }

  const existing = rows[0];
  const updatedData = {
    matricula,
    marca,
    modelo,
    anio_matriculacion,
    numero_plazas,
    autonomia_km,
    precio_por_dia,
    color,
    estado,
    id_concesionario,
  };

  if (req.file) {
    updatedData.imagen = "/images/autos/" + req.file.filename;
  }

  const updates = [];
  const values = [];

  Object.entries(updatedData).forEach(([field, value]) => {
    if (typeof value === "undefined") return;
    const existingValue =
      existing[field] === null || typeof existing[field] === "undefined"
        ? ""
        : `${existing[field]}`;
    const newValue =
      value === null || typeof value === "undefined" ? "" : `${value}`;
    if (newValue !== existingValue) {
      updates.push(`${field} = ?`);
      values.push(value);
    }
  });

  if (!updates.length) {
    req.flash("success", "No hubo cambios que guardar.");
    return res.redirect("/admin/vehiculos");
  }

  values.push(id_automovil);
  const sql = `UPDATE automovil SET ${updates.join(", ")} WHERE id_automovil = ?`;
  await promisePool.execute(sql, values);

  req.flash("success", "Vehículo actualizado correctamente");
  res.redirect("/admin/vehiculos");
}

module.exports = router;
