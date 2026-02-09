import prismaClient from '../../prisma';

class VerificarCodigoService {
    async execute(userId: string, codigo: string) {
        try {
            // Verificar se o código existe e está correto
            const codigoRecuperacao = await prismaClient.rec_senha.findFirst({
                where: {
                    userId: userId,
                    codigo: Number(codigo),
                    usado: false,  // Certifique-se de que o código ainda não foi usado
                    deletedAt: null
                },
            });

            if (!codigoRecuperacao) {
                return { message: 'Código inválido ou já utilizado' };
            }

            // Marcar o código como usado
            await prismaClient.rec_senha.update({
                where: { id: codigoRecuperacao.id },
                data: { usado: true },
            });

            return { message: 'Código validado com sucesso' };
        } catch (error) {
            console.error('Error in VerificarCodigoService:', error);
            return { message: 'Erro ao validar o código' };
        }
    }
}

export { VerificarCodigoService };
