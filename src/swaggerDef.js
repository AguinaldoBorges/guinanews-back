const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'API de Notícias Guina News',
            version: '1.0.0',
            description: 'Documentação da minha API Express com Swagger',
        },
    },
    apis: ['src/routes/*.js'], // Caminho para os arquivos de rota da sua API
};

const specs = swaggerJsdoc(options);

module.exports = specs;
