const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
    openapi: '3.0.0',
    info: {
        title: 'Library Management System API',
        version: '1.0.0',
        description: 'documentation for the Library Management System API',
    },
    servers: [
        { url: 'http://localhost:3000' },
    ],
    components: {
        securitySchemes: {
        tokenAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'token',
        },
    },
    },
    security: [
        { tokenAuth: [] },
    ],
    },
    apis: ['./router/router.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger available at /api-docs');
}

module.exports = swaggerDocs;