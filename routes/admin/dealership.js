"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM cocesionario";
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/dealership_form", { dealerships: results });
      }
    });
  })
  .post((req, res) => {
    //TODO add a new dealership to the database
  });

module.exports = router;
