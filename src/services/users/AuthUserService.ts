import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../configs/config";

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    const usuario = await prismaClient.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        permissao: true,
        deletedAt: true,
      },
    });

    // Não existe ou está soft-deletado
    if (!usuario || usuario.deletedAt) {
      return "Usuário ou senha incorretos. Tente novamente.";
    }

    const senhaOk = await compare(senha, usuario.senha);
    if (!senhaOk) {
      return "Usuário ou senha incorretos. Tente novamente.";
    }

    if (!JWT_SECRET) {
      return "Chave secreta JWT não definida.";
    }

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        permissao: usuario.permissao,
      },
      JWT_SECRET,
      {
        subject: usuario.id,
        expiresIn: "1d",
      }
    );

    return {
      message: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        permissao: usuario.permissao,
        token,
      },
    };
  }
}

export { AuthUserService };
