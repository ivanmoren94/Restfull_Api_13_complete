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
    match: [/^\S+@\S+\.\S+$/ , 'Correo incorrecto']
  },
  age: {
    type: Number,
    default:0
  }
});


// Define el índice en el campo 'age'
userSchema.index({ age: 1 });
userSchema.index({ name: 1 });

// ^: Indica el inicio de la cadena.
// \S+: Coincide con uno o más caracteres que no sean un espacio en blanco. En este caso, antes del símbolo @ busca al menos un carácter que no sea un espacio en blanco.
// @: Busca el carácter "@".
// \S+: Similar al primero, busca uno o más caracteres que no sean un espacio en blanco después del símbolo @.
// \.: Busca un punto literal (.). Se usa \ antes del punto porque el punto en una expresión regular coincide con cualquier carácter, pero \. lo convierte en un punto literal.
// \S+: Busca uno o más caracteres que no sean un espacio en blanco después del punto.
// $: Indica el final de la cadena.

// Crea el modelo 'User' basado en el esquema 'userSchema' definido anteriormente
const user = mongoose.model("User", userSchema, "User");

// El nombre del modelo es "User", pero la colección correspondiente en la base de datos se llamará automáticamente "users" (en minúsculas y en plural). 
// Es la convención que sigue Mongoose por defecto para nombrar las colecciones cuando no se especifica un nombre de colección personalizado en el modelo.

// Exporta el modelo 'User' para que pueda ser utilizado en otras partes de la aplicación
module.exports = user;
