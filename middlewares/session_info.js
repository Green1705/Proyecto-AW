"use strict";

function session_info(req, res, next) {
  const session = req.session;

  req.locals.userId = session.userId || null;
  req.locals.name = session.name || null;
  req.locals.lastName = session.lastName || null;
  req.locals.isLoggedIn = session.isLoggedIn || false;
  req.locals.isAdmin = session.isAdmin || false;
}

module.exports = session_info;
