"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM usuario";
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/employee_form", { employees: results });
      }
    });
  })
  .post((req, res) => {
    //TODO add a new employee to the database
  });

module.exports = router;
