import { validate } from 'class-validator';
import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { CreateUserDTO } from '../../DTO/CreateUserDTO';
import { convertToDateTime } from '../../utils/convertToDateTime';

interface CreateUserInput {
    nome: string;
    senha: string;
    email: string;
    dataNasc: string;
    telefone: string;
}

class CreateUserService {
    async execute(createUserInput: CreateUserInput) {
        try {
            // Validação dos dados
            const createUserDTO = new CreateUserDTO(createUserInput);
            const errors = await validate(createUserDTO);

            if (errors.length > 0) {
                const errorMessage = errors
                    .map(error => error.constraints ? Object.values(error.constraints).join(', ') : '')
                    .filter(msg => msg)
                    .join('. ');
                return errorMessage;
            }

            const { nome, email, senha, telefone, dataNasc } = createUserInput;

            // Verificando se o telefone já existe
            const existingUserByTelefone = await prismaClient.usuario.findFirst({ where: { telefone } });
            if (existingUserByTelefone) {
                return 'O telefone informado já está em uso por outro usuário.';
            }

            // Verificando se o email já existe
            const existingUserByEmail = await prismaClient.usuario.findFirst({ where: { email } });
            if (existingUserByEmail) {
                return 'O email informado já está em uso por outro usuário.';
            }

            const data_nasc = await convertToDateTime(dataNasc);

            // Hash da senha
            const hashedPassword = await hash(senha, 10);

            // Criando usuário
            const user = await prismaClient.usuario.create({
                data: {
                    nome,
                    email,  // Incluindo o email no objeto de criação
                    senha: hashedPassword,
                    data_nasc,
                    telefone,
                },
            });

            return { message: user };
        } catch (error) {
            console.error('Falha ao criar usuario:', error);
            return 'Falha ao criar usuario';
        }
    }
}

export { CreateUserService };
