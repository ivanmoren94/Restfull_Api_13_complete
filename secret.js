// Importar el módulo 'crypto'
const crypto = require("crypto");

// Definir el valor del secreto utilizado para generar el hash
const secret = "Full stack 13 refreshToken";

// Crear un objeto de hash utilizando el algoritmo SHA-256 y el secreto
const hash = crypto
  .createHmac("sha256", secret) // Crea un objeto de hash HMAC utilizando el algoritmo SHA-256 y el secreto proporcionado
  .update("Soy otro campo para mejorar el hash") // Actualiza el hash con los datos proporcionados (cadena de texto en este caso)
  .digest("hex"); // Genera el hash en formato hexadecimal

// Imprimir el resultado del hash
console.log(hash);