"use strict";

const express = require("express");
const path = require("path");
const morgan = require("morgan"); //logs
const bodyParser = require("body-parser");//parse body of http response
const session = require("express-session");;
const multer = require("multer"); //form encoding
const multerFactory = multer({dest: './uploads'});
const app = express();

const vehiclesRoutes = require("./routes/vehiculos.js");
const reserveForm= require("./routes/formulario_reserva.js");
const middlewareSession = session({
  saveUninitialized: false,
  secret: "example",
  resave: false,
});

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewareSession);

app.use("/vehiculos", vehiclesRoutes);
app.use("/reserva", reserveForm);
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 3000:\nhttp://localhost:3000");
  }
});
