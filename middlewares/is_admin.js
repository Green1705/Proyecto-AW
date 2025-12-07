"use strict";

function isAdmin(req, res, next) {
  if (!req.session) {
    req.session = {};
  }
  if (typeof req.session.isAdmin === "undefined") {
    req.session.isAdmin = true;
  }
  next();
}

module.exports = isAdmin;
