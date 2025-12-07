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

module.exports = router;
