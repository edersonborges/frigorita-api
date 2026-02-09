import { Router } from 'express';
import { isAuthenticated } from './Middlewares/isAuthenticated';
import multer from 'multer';
import {
    createUserController,
    authUserController,
    logoutController,
    deleteUserController,
    updateUserController,
    changePswController,
    listarUserDadosController,
    uploadMediaController,
    gerarCodPswController,
    verificarCodigoController,

} from './controllers';

const upload = multer();

const initializeRoutes = (): Router => {
    const router = Router();
    
    // User routes
    router.post('/user/cadastrar', createUserController.handle.bind(createUserController));
    router.post('/login', authUserController.handle.bind(authUserController));
    router.delete('/user/delete', isAuthenticated, deleteUserController.handle.bind(deleteUserController));
    router.put('/user/update/:id', isAuthenticated, updateUserController.handle.bind(updateUserController));
    router.get('/logout', isAuthenticated, logoutController.handle.bind(logoutController));
    router.get('/user/dados', isAuthenticated, listarUserDadosController.handle.bind(listarUserDadosController));
    router.post('/upload-media', upload.single('media'), uploadMediaController.handle.bind(uploadMediaController));
    router.post('/password/codigo', gerarCodPswController.handle.bind(gerarCodPswController));
    router.post('/password/verificar/:userId', verificarCodigoController.handle.bind(verificarCodigoController));
    router.put('/password/change/:id', changePswController.handle.bind(changePswController));

    return router;
};

export const router = initializeRoutes();
