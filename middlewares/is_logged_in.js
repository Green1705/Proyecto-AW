"use strict";

function is_logged(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = is_logged;
