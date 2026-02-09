import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { router } from './routes';
import 'express-async-errors';
import cors from 'cors';
import { PORT } from './configs/config';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json';

const port = PORT || 5003;

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

// Middleware para logar as requisições
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode}`);
  });

  next();
});

// Rota inicial para verificar se o servidor está rodando
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Rota para documentação da API com Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rotas principais
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

// Iniciando o servidor HTTP
server.listen(port, () => {
  console.log(`Servidor Online na porta: ${port}!!`);
});
