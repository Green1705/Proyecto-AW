"use strict";

function is_logged(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.json({ error: "Sesión no iniciada" });
  }
}

module.exports = is_logged;
