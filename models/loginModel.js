const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["user", "admin"],
    trim: true,
    default: "user",
  },
});

//El tercer parámetro es el nombre de la colección en la base de datos
const Login = mongoose.model("Login", loginSchema, "Login");

module.exports = Login;