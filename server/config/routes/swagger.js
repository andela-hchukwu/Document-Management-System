
import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';

const router = express.Router();

  // swagger definition
const swaggerDefinition = {
  info: {
    title: 'iamdocuman API',
    version: '1.0.0',
    description: 'API documentation for iAmDocuman',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/config/routes/document.js', './server/config/routes/user.js', './server/config/routes/user.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
