import { Request as ExpressRequest } from "express";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

class UpdateUserService {
  public async execute(req: ExpressRequest) {
    const { id } = req.params;
    const { nome, email, senha, permissao } = req.body;

    try {
      if (!id) {
        return { message: "ID do usuário é obrigatório" };
      }

      // Verificando se o usuário existe e não está soft-deletado
      const existingUser = await prismaClient.usuario.findUnique({
        where: { id },
        select: { id: true, email: true, deletedAt: true },
      });

      if (!existingUser || existingUser.deletedAt) {
        return { message: "Usuário não encontrado" };
      }

      const data: any = {};

      if (nome) data.nome = nome;

      // Se estiver alterando email, verifica duplicidade
      if (email && email !== existingUser.email) {
        const emailInUse = await prismaClient.usuario.findUnique({
          where: { email },
          select: { id: true },
        });

        if (emailInUse) {
          return { message: "O email informado já está em uso por outro usuário." };
        }

        data.email = email;
      }

      // Se estiver alterando senha, faz hash
      if (senha) {
        data.senha = await hash(senha, 10);
      }

      // Se estiver alterando permissao (inteiro)
      if (typeof permissao === "number") {
        data.permissao = permissao;
      }

      if (Object.keys(data).length === 0) {
        return { message: "Nenhum campo válido para atualizar." };
      }

      const user = await prismaClient.usuario.update({
        where: { id },
        data,
        select: {
          id: true,
          nome: true,
          email: true,
          permissao: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

      return { message: "Usuário atualizado com sucesso", user };
    } catch (error: any) {
      console.error("Error in UpdateUserService:", error);
      return {
        message: "Falha ao atualizar informações do usuário",
        error: error?.message,
      };
    }
  }
}

export { UpdateUserService };
