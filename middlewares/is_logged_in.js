"use strict";

function is_logged(req, res, next) {
  next();
}

module.exports = is_logged;
