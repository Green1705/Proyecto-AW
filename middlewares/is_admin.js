"use strict";

function isAdmin(req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Usuario no autorizado" });
  }
}

module.exports = isAdmin;
