"use strict";

const multer = require("multer");

const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/autos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ storage: storageImages });

module.exports = uploadImage;
