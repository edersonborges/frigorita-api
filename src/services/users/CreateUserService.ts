import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface CreateUserInput {
  nome: string;
  email: string;
  senha: string;
  permissao?: number;
}

class CreateUserService {
  async execute(createUserInput: CreateUserInput) {
    try {
      const { nome, email, senha, permissao } = createUserInput;

      if (!nome || !email || !senha) {
        return "nome, email e senha são obrigatórios.";
      }

      // Verifica email duplicado
      const existingUserByEmail = await prismaClient.usuario.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUserByEmail) {
        return "O email informado já está em uso por outro usuário.";
      }

      const hashedPassword = await hash(senha, 10);

      const user = await prismaClient.usuario.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          permissao: typeof permissao === "number" ? permissao : undefined, // se não enviar, Prisma usa default(0)
        },
        select: {
          id: true,
          nome: true,
          email: true,
          permissao: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return { message: "Usuário criado com sucesso", user };
    } catch (error) {
      console.error("Falha ao criar usuario:", error);
      return "Falha ao criar usuario";
    }
  }
}

export { CreateUserService };
