import { Request as ExpressRequest } from 'express';
import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import { sendEmail } from '../../utils/mailer';

class ChangePswService {
    async execute(req: ExpressRequest) {
        const { id } = req.params;
        const { pswNova, pswConfirm } = req.body;
        try {
            // Verificar se as senhas coincidem
            if (pswNova !== pswConfirm) {
                return 'As senhas devem corresponder';
            }

            const user = await prismaClient.usuario.findUnique({
                where: { id: id },
            });

            if (!user) {
                return 'Usuario não existe';
            }

            // Criptografar a nova senha
            const hashedPassword = await hash(pswNova, 10);

            // Atualizar a senha no banco de dados
            await prismaClient.usuario.update({
                where: { id: id },
                data: { senha: hashedPassword },
            });

            // Enviar email de notificação
            const subject = 'Senha alterada com sucesso';
            // Substitua com seu template de email apropriado
            // await sendEmail(user.email, subject, emailTemplate.getTemplate(), emailTemplate.getTemplateText());

            return { message: 'Senha alterada com sucesso' };
        } catch (error) {
            console.error('Error in ChangePswService:', error);
            return 'Failed to change password';
        }
    }
}

export { ChangePswService };
