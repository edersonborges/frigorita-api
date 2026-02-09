import prismaClient from '../../prisma';

class ListarUserDadosService {
    async execute(userId: string) {
        try {
            const user = await prismaClient.usuario.findUnique({
                where: { id: userId },
            });
            return { message: user };
        } catch (error) {
            console.error('Error in ListarUserDadosService:', error);
            return 'Failed to find ListarUserDados information';
        }
    }
}

export { ListarUserDadosService };
