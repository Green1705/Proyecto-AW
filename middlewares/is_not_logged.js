"use strict";

function is_not_logged(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return res.redirect("/");
  }
  next();
}

module.exports = is_not_logged;
