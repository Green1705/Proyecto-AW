"use strict";

function session_info(req, res, next) {
  const session = req.session;

  res.locals.userId = session.userId || null;
  res.locals.name = session.name || null;
  res.locals.lastName = session.lastName || null;
  res.locals.isLoggedIn = session.isLoggedIn || false;
  res.locals.isAdmin = session.isAdmin || false;
  res.locals.dealershipId = session.dealershipId || null;
  const contrastPreference = session.contrastPreference || "normal";
  const textSizePreference = session.textSizePreference || "normal";
  res.locals.contrastPreference = contrastPreference;
  res.locals.textSizePreference = textSizePreference;

  const bodyClasses = [];
  if (contrastPreference === "alto") {
    bodyClasses.push("contrast-high");
  }
  if (textSizePreference === "grande") {
    bodyClasses.push("text-size-large");
  } else if (textSizePreference === "pequeno") {
    bodyClasses.push("text-size-small");
  }
  res.locals.bodyClassNames = bodyClasses.join(" ");

  next();
}

module.exports = session_info;
