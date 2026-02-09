import { Request as ExpressRequest } from 'express';
import prismaClient from '../../prisma';
import { convertToDateTime } from '../../utils/convertToDateTime';

class UpdateUserService {
  public async execute(req: ExpressRequest) {
    const { id } = req.params;
    const { nome, telefone, data_nasc, tipoImagem, img_key } = req.body;

    try {
      const data: any = {};

      if (nome) data.nome = nome;
      if (telefone) data.telefone = telefone;
      if (data_nasc) data.data_nasc = await convertToDateTime(data_nasc);

      // Verificando se o usuário existe
      const existingUser = await prismaClient.usuario.findUnique({ where: { id } });
      if (!existingUser) {
        return { message: 'Usuário não encontrado' };
      }

      // Atualizando o usuário
      const user = await prismaClient.usuario.update({
        where: { id },
        data,
      });

      // Verificando se há uma imagem associada para ser atualizada
      if (img_key) {
        const fileData = {
          userId: id,
          tipo: tipoImagem,
          img_key,
        };

        await prismaClient.arquivos.create({
          data: fileData,
        });
      }

      return { message: 'Usuário atualizado com sucesso', user };
    } catch (error) {
      console.error('Error in UpdateUserService:', error);
      return { message: 'Falha ao atualizar informações do usuário', error: error.message };
    }
  }
}

export { UpdateUserService };
