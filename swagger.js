const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes.ts']; // Altere para o caminho correto das suas rotas

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger JSON generated');
});
