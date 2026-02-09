import { Router } from 'express';
import { isAuthenticated } from './Middlewares/isAuthenticated';
import multer from 'multer';
import {
  createUserController,
  authUserController,
  deleteUserController,
  updateUserController,
  changePswController,
  listarUserDadosController,
  createPedidoController,
} from './controllers';

const upload = multer();

const initializeRoutes = (): Router => {
  const router = Router();

  // User routes
  router.post('/user/cadastrar', createUserController.handle.bind(createUserController));
  router.post('/login', authUserController.handle.bind(authUserController));
  router.delete('/user/delete', isAuthenticated, deleteUserController.handle.bind(deleteUserController));
  router.put('/user/update/:id', isAuthenticated, updateUserController.handle.bind(updateUserController));
  router.get('/user/dados', isAuthenticated, listarUserDadosController.handle.bind(listarUserDadosController));
  router.put('/password/change/:id', changePswController.handle.bind(changePswController));

  // Pedido routes
  router.post('/pedido/cadastrar', isAuthenticated, createPedidoController.handle.bind(createPedidoController));

  return router;
};

export const router = initializeRoutes();
