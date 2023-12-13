// Importamos el modulo de express
const express = require("express");
// Importamos mongo
const mongoose = require("mongoose");
// Declaramos el puerto donde se levantará el servidor
const PORT = 3000;
const userRouter = require("./router/userRoutes");

//Así inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();

//Analizamos los archivos JSON
app.use(express.json());

// Esto nos permite obtener la información de configuración de ".env"
require("dotenv").config();

const url_mongo = process.env.DATABASE_URL_DEV;

mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Succecss connect`);
});

db.on("disconected", () => {
  console.log(`Mongo is disconected`);
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
