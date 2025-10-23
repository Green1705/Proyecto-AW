"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");

const cars = [
  { make: "Seat", model: "Ibiza", color: "rojo" },
  { make: "Toyota", model: "Yaris", color: "blanco" },
  { make: "Tesla", model: "X", color: "negro" },
];

const server = http.createServer((request, response) => {
  let filePath = "." + request.url;
  if (filePath === "./") {
    filePath = "./index.html";
  } else if (filePath === "./vehiculos") {
    response.end(
      "<h1>Array con vehiculos</h1> <p>" +
        cars[0].make +
        " " +
        cars[0].model +
        " " +
        cars[0].color +
        " " +
        "<br>" +
        cars[1].make +
        " " +
        cars[1].model +
        " " +
        cars[1].color +
        " " +
        "<br>" +
        cars[2].make +
        " " +
        cars[2].model +
        " " +
        cars[2].color +
        " " +
        "<br>" +
        "</p>",
    );
  } else if (filePath === "./reserva") {
    filePath = "./reservation_form.html";
  }
  // else {
  //    res.writeHead(404, { "Content-Type": "text/html" });
  //    res.end("<h1>404 - No se encontro la página</h1>");
  //  }

  const dotname = String(path.extname(filePath)).toLowerCase();

  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
  };

  const contentType = fileTypes[dotname];

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>404  No se encontro la pagina</h1>");
      } else {
        response.writeHead(500);
        response.end(`Error en el servidor: ${err.code}`);
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content);
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Servidor activo en el puerto " + PORT);
});
