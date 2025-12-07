"use strict";

function status_message(req, res, next) {
  res.locals.success = req.flash("success") || null;
  res.locals.error = req.flash("error") || null;
  next();
}

module.exports = status_message;
