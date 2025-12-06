"use strict";

const express = require("express");
const pool = require("../../db/db.js");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const query = "SELECT * FROM automovil";
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.render("forms/employee_form", { cars: results });
      }
    });
  })
  .post((req, res) => {
    //TODO add a new car to the database
  });

//TODO add the route to handle(alter) individual car details
//
module.exports = router;
