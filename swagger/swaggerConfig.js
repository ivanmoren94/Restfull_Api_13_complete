// Importa el módulo 'swagger-jsdoc' y lo asigna a la variable 'swaggerJSDoc'
const swaggerJSDoc = require('swagger-jsdoc');

// Crea un objeto 'options' que contiene la configuración para la documentación Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Versión de OpenAPI utilizada
    info: {
      title: 'Nombre de tu API', // Título de la API
      version: '1.0.0', // Versión de la API
      description: 'Descripción de tu API', // Descripción de la API
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base de tu API
        description: 'Servidor local', // Descripción del servidor
      },
    ],
  },
  apis: ['./router/*.js'], // Ruta donde se encuentran tus archivos de rutas
};

// Genera la especificación Swagger utilizando 'swagger-jsdoc' con las opciones proporcionadas
const swaggerSpec = swaggerJSDoc(options);

// Exporta la especificación Swagger para ser utilizada en otros archivos
module.exports = swaggerSpec;
