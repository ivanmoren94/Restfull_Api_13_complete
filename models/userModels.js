const mongoose = require("mongoose"); // Importa el paquete mongoose para interactuar con MongoDB
const Schema = mongoose.Schema; // Extrae la clase Schema de mongoose para definir esquemas

// Define el esquema del usuario utilizando la clase Schema de mongoose
const userSchema = new Schema({
  name: {
    type: String, // Campo de tipo String para el nombre del usuario
    required: true, // Campo requerido, no puede estar vacío
  },
  email: {
    type: String, // Campo de tipo String para el correo electrónico del usuario
    required: true, // Campo requerido, no puede estar vacío
  },
});

// Crea el modelo 'User' basado en el esquema 'userSchema' definido anteriormente
const user = mongoose.model("User", userSchema, "User");

// El nombre del modelo es "User", pero la colección correspondiente en la base de datos se llamará automáticamente "users" (en minúsculas y en plural). 
// Es la convención que sigue Mongoose por defecto para nombrar las colecciones cuando no se especifica un nombre de colección personalizado en el modelo.

// Exporta el modelo 'User' para que pueda ser utilizado en otras partes de la aplicación
module.exports = user;
