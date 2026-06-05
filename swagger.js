const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
        },
    },
    apis: ['./router/*.js'],
};

module.exports = swaggerJsdoc(options);