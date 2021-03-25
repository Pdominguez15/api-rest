const jsonServer = require("json-server");
const path = require("path");
const multer = require("multer");

//Recoger imagen y guardarla en carpeta
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/assets"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//Mostrar las imagenes
const server = jsonServer.create({ static: "../public/assets" });

//Mostrar los datos mockeados
const router = jsonServer.router(
  path.join(__dirname, "../mock-data/mock-data.json")
);

//Configurar las rutas
const routes = require("../config/routes.json");
server.use(jsonServer.rewriter(routes));

//Añadir los middlwares
const middlewares1 = jsonServer.defaults();
const middlewares2 = multer({ storage });
const middlewares3 = require("../config/middleware.js");

server.use(middlewares1);
server.use(middlewares2.single("image"));
server.use(middlewares3);

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
