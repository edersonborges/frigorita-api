import { CreateUserController } from './users/CreateUserController';
import { AuthUserController } from './users/AuthUserController';
import { LogoutController } from './users/LogoutController';
import { DeleteUserController } from './users/DeleteUserController';
import { UpdateUserController } from './users/UpdateUserController';
import { ChangePswController } from './users/ChangePswController';
import { ListarUserDadosController } from './users/ListarUserDadosController';
import { UploadMediaController } from './media/UploadMediaController';
import { GerarCodPswController } from './users/GerarCodPswController';
import { VerificarCodigoController } from './users/VerificarCodigoController';




import { CreateUserService } from '../services/users/CreateUserService';
import { AuthUserService } from '../services/users/AuthUserService';
import { LogoutService } from '../services/users/LogoutService';
import { DeleteUserService } from '../services/users/DeleteUserService';
import { UpdateUserService } from '../services/users/UpdateUserService';
import { ChangePswService } from '../services/users/ChangePswService';
import { ListarUserDadosService } from '../services/users/ListarUserDadosService';
import { UploadMediaService } from '../services/media/UploadMediaService';
import { GerarCodPswService } from '../services/users/GerarCodPswService';
import { VerificarCodigoService } from '../services/users/VerificarCodigoService';




const createUserService = new CreateUserService();
const authUserService = new AuthUserService();
const logoutService = new LogoutService();
const deleteUserService = new DeleteUserService();
const updateUserService = new UpdateUserService();
const changePswService = new ChangePswService();
const listarUserDadosService = new ListarUserDadosService();
const uploadMediaService = new UploadMediaService();
const gerarCodPswService = new GerarCodPswService();
const verificarCodigoService = new VerificarCodigoService();




export const createUserController = new CreateUserController(createUserService);
export const authUserController = new AuthUserController(authUserService);
export const logoutController = new LogoutController(logoutService);
export const deleteUserController = new DeleteUserController(deleteUserService);
export const updateUserController = new UpdateUserController(updateUserService);
export const changePswController = new ChangePswController(changePswService);
export const listarUserDadosController = new ListarUserDadosController(listarUserDadosService);
export const uploadMediaController = new UploadMediaController(uploadMediaService);
export const gerarCodPswController = new GerarCodPswController(gerarCodPswService);
export const verificarCodigoController = new VerificarCodigoController(verificarCodigoService);