"use strict";

const express = require("express");
const pool = require("../../db/db.js");
const uploadImage = require("../../middlewares/uploadImage.js");

const router = express.Router();
const promisePool = pool.promise();
const dealersQuery = "SELECT id_concesionario, nombre FROM concesionario";

router
  .route("/")
  .get((req, res) => {
    const query =
      "SELECT a.*, c.nombre AS concesionario_nombre FROM automovil AS a LEFT JOIN concesionario AS c ON a.id_concesionario = c.id_concesionario";
    pool.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        pool.query(dealersQuery, (err2, dealers) => {
          if (err2) {
            res.status(500).json({ message: err2 });
          } else {
            res.render("forms/cars_form", {
              cars: result,
              dealerships: dealers,
              success: req.flash("success"),
              error: req.flash("error"),
            });
          }
        });
      }
    });
  })
  .post(uploadImage.single("imagen"), (req, res) => {
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

    pool.query(
      query,
      [
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
      ],
      (err, result) => {
        if (err) {
          req.flash("error", "Error al crear vehiculo");
          res.redirect("/admin/vehiculos");
        } else {
          req.flash("success", "Vehiculo creado correctamente");
          res.redirect("/admin/vehiculos");
        }
      },
    );
  });

router.post("/delete", async (req, res) => {
  const { id_automovil } = req.body;
  if (!id_automovil) {
    req.flash("error", "No se especificó el vehículo a eliminar");
    return res.redirect("/admin/vehiculos");
  }
  let connection;
  try {
    connection = await promisePool.getConnection();
    await connection.beginTransaction();

    await connection.execute("DELETE FROM reserva WHERE id_automovil = ?", [
      id_automovil,
    ]);
    const [result] = await connection.execute(
      "DELETE FROM automovil WHERE id_automovil = ?",
      [id_automovil],
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      req.flash("error", "El vehículo indicado no existe");
    } else {
      await connection.commit();
      req.flash("success", "Vehículo eliminado correctamente");
    }
  } catch (error) {
    console.error(error);
    if (connection) {
      try {
        await connection.rollback();
      } catch (_) {}
    }
    req.flash("error", "No se pudo eliminar el vehículo");
  } finally {
    if (connection) connection.release();
  }
  res.redirect("/admin/vehiculos");
});

router.post("/update", uploadImage.single("imagen"), async (req, res) => {
  const { id_automovil } = req.body;
  if (!id_automovil) {
    req.flash("error", "No se especificó el vehículo a modificar");
    return res.redirect("/admin/vehiculos");
  }

  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM automovil WHERE id_automovil = ?",
      [id_automovil],
    );
    if (!rows.length) {
      req.flash("error", "El vehículo indicado no existe");
      return res.redirect("/admin/vehiculos");
    }

    const currentVehicle = rows[0];
    const coerceNumber = (value, fallback) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };
    const sanitized = {
      matricula: (req.body.matricula || "").trim() || currentVehicle.matricula,
      marca: (req.body.marca || "").trim() || currentVehicle.marca,
      modelo: (req.body.modelo || "").trim() || currentVehicle.modelo,
      anio_matriculacion: coerceNumber(
        req.body.anio_matriculacion,
        currentVehicle.anio_matriculacion,
      ),
      numero_plazas: coerceNumber(
        req.body.numero_plazas,
        currentVehicle.numero_plazas,
      ),
      autonomia_km: coerceNumber(
        req.body.autonomia_km,
        currentVehicle.autonomia_km,
      ),
      precio_por_dia: coerceNumber(
        req.body.precio_por_dia,
        currentVehicle.precio_por_dia,
      ),
      color: (req.body.color || "").trim() || currentVehicle.color,
      imagen: req.file
        ? "/images/autos/" + req.file.filename
        : req.body.current_imagen || currentVehicle.imagen,
      estado: (req.body.estado || "").trim() || currentVehicle.estado,
      id_concesionario:
        (req.body.id_concesionario || "").trim() || currentVehicle.id_concesionario,
    };

    const fields = Object.keys(sanitized);
    const setClause = fields.map((field) => `${field}=?`).join(", ");
    const values = [...fields.map((field) => sanitized[field]), id_automovil];

    await promisePool.query(
      `UPDATE automovil SET ${setClause} WHERE id_automovil=?`,
      values,
    );
    req.flash("success", "Vehículo actualizado correctamente");
  } catch (error) {
    console.error(error);
    req.flash("error", "No se pudo actualizar el vehículo");
  }

  return res.redirect("/admin/vehiculos");
});

module.exports = router;
