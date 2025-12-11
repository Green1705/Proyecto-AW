"use strict";

const express = require("express");
const pool = require("../db/db.js");

const router = express.Router();
const VALID_CONTRAST = new Set(["normal", "alto"]);
const VALID_TEXT_SIZE = new Set(["pequeno", "normal", "grande"]);

router.get("/", (req, res) => {
  const userId = req.session && req.session.userId;
  if (!userId) {
    req.flash("error", "Debes iniciar sesión para ver tu perfil");
    return res.redirect("/login");
  }

  const query =
    "SELECT r.*, a.matricula FROM reserva AS r LEFT JOIN automovil AS a ON r.id_automovil = a.id_automovil WHERE r.estado <> 'activa' AND r.id_usuario = ? ORDER BY r.fecha_fin DESC";

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      req.flash("error", "No se pudieron cargar tus reservas");
      return res.redirect("/");
    }

    res.render("profile", {
      reservations: result || [],
    });
  });
});

router.post("/accesibilidad", (req, res) => {
  const userId = req.session && req.session.userId;
  if (!userId) {
    req.flash("error", "Debes iniciar sesión para actualizar tus preferencias");
    return res.redirect("/login");
  }

  const requestedContrast = (req.body.contraste || "").toLowerCase();
  const requestedTextSize = (req.body.tamanio_texto || "").toLowerCase();
  const contrast = VALID_CONTRAST.has(requestedContrast) ? requestedContrast : "normal";
  //make sure it is pequeno without the ñ otherwise it will break
  const textSize = VALID_TEXT_SIZE.has(requestedTextSize) ? requestedTextSize : "normal";

  const query = "UPDATE usuario SET contraste = ?, tamanio_texto = ? WHERE id_usuario = ?";
  pool.query(query, [contrast, textSize, userId], (err) => {
    if (err) {
      console.error(err);
      req.flash("error", "No se pudieron guardar las preferencias de accesibilidad");
    } else {
      req.session.contrastPreference = contrast;
      req.session.textSizePreference = textSize;
      req.flash("success", "Preferencias de accesibilidad guardadas");
    }
    res.redirect("/perfil");
  });
});

module.exports = router;
