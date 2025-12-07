"use strict";

const express = require("express");
const path = require("path");
const morgan = require("morgan"); //logs
const bodyParser = require("body-parser"); //parse body of http response
const session = require("express-session");
const multer = require("multer"); //form encoding
const multerFactory = multer({ dest: "./uploads" });
const flash = require("connect-flash");
const app = express();

const vehiclesRoutes = require("./routes/vehiculos.js");
const reserveForm = require("./routes/formulario_reserva.js");
const loginForm = require("./routes/login.js");
const adminRouter = require("./routes/admin/admin.js");
const middlewareSession = session({
  saveUninitialized: false,
  secret: "example",
  resave: false,
});
const is_logged = require("./middlewares/is_logged_in.js");
const session_info = require("./middlewares/session_info.js");

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewareSession);
app.use(flash());

app.get("/api/session", is_logged, (req, res) => {
  const session = req.session || {};
  res.json({
    ok: true,
    isLoggedIn: session.isAuthenticated || false,
    name: session.name || null,
    last_name: session.last_name || null,
    isAdmin: session.isAdmin || false,
  });
});

app.use(session_info);
app.use("/login", loginForm);
app.use("/vehiculos", is_logged, vehiclesRoutes);
app.use("/reserva", is_logged, reserveForm);
app.use("/admin", adminRouter);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 3000:\nhttp://localhost:3000");
  }
});
