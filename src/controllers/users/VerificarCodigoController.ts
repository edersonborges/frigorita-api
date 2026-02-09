import { Request, Response } from 'express';
import { VerificarCodigoService } from '../../services/users/VerificarCodigoService';

class VerificarCodigoController {
    private verificarCodigoService: VerificarCodigoService;

    constructor(verificarCodigoService: VerificarCodigoService) {
        this.verificarCodigoService = verificarCodigoService;
    }

    async handle(req: Request, res: Response) {
        const { userId } = req.params;
        const { codigo } = req.body;

        try {
            const result = await this.verificarCodigoService.execute(userId, codigo);

            if (result.message.includes('inválido')) {
                return res.status(400).json(result);
            }

            return res.json(result);
        } catch (error) {
            console.error('Error in VerificarCodigoController:', error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

export { VerificarCodigoController };
