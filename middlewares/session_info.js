"use strict";

const { getClients } = require("../data/store.js");

function session_info(req, res, next) {
  const session = req.session || {};

  res.locals.userId = session.userId || null;
  res.locals.name = session.name || null;
  res.locals.lastName = session.lastName || null;
  res.locals.isLoggedIn = session.isLoggedIn || false;
  res.locals.isAdmin = session.isAdmin || false;
  res.locals.clients = getClients();

  next();
}

module.exports = session_info;
