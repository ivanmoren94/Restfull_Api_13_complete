const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser menor que 0'] 
  },
  description: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL'],// Enumera los valores permitidos
    default: ['S', 'M', 'L', 'XL'] // Explicamos que podemos poner valores por defecto
  },
  colors: {
    type: [String], // Campo para almacenar múltiples colores
    required: true,
		validate: [arrayMinLengthValidator, "Debe haber al menos un color."],
  },
  brand: {
    type: String,
    required: true
  }
});


// Validador personalizado para asegurarse de que haya al menos un elemento en el array
function arrayMinLengthValidator(arr) {
  return arr.length > 0;
}

const Product = mongoose.model("Products", productSchema,"Products");

module.exports = Product;