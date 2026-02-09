import prismaClient from '../../prisma';
import { sendEmail } from '../../utils/mailer';

class GerarCodPswService {
    async execute(email: string) {
        try {
            // Verificar se o usuário existe
            const user = await prismaClient.usuario.findUnique({
                where: { email },
            });

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Gerar código de 4 dígitos
            const codigo = Math.floor(1000 + Math.random() * 9000);

            // Enviar o código por e-mail
            const emailSubject = 'Código de Recuperação de Senha';
            const emailHtml = `<p>Seu código de recuperação de senha é: <strong>${codigo}</strong></p>`;

            // await sendEmail(user.email, emailSubject, emailHtml);
            console.log(codigo);

            // Armazenar o código no banco de dados
            await prismaClient.rec_senha.create({
                data: {
                    userId: user.id,
                    codigo,
                    usado: false,
                },
            });

            return { message: 'Código de recuperação enviado para o e-mail' };
        } catch (error) {
            console.error('Error in GerarCodPswService:', error);
            throw new Error('Erro ao gerar código de recuperação');
        }
    }
}

export { GerarCodPswService };
