import prismaClient from '../../prisma';

class DeleteUserService {
    async execute(userId: string) {
        try {
            const data = new Date();

            await prismaClient.usuario.update({
                where: { id: userId },
                data: { deletedAt: data },
            });
            return { message: 'Usuario deletado com sucesso' };
        } catch (error) {
            console.error('Error in DeleteUserService:', error);
            return 'Failed to find DeleteUser information';
        }
    }
}

export { DeleteUserService };