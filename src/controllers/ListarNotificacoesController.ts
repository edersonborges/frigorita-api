import { Request, Response } from 'express';
import { ListarNotificacoesService } from '../services/ListarNotificacoesService';
import { serializeBigInt } from '../utils/serializeBigInt';

class ListarNotificacoesController {
    private listarNotificacoesService: ListarNotificacoesService;

    constructor(listarNotificacoesService: ListarNotificacoesService) {
        this.listarNotificacoesService = listarNotificacoesService;
    }

    async handle(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const result = await this.listarNotificacoesService.execute(userId);

            if (typeof result === 'string') {
                return res.status(400).json({ error: result });
            }

            const message = serializeBigInt(result);
            return res.json({ success: true, message });
        } catch (error) {
            console.error('Error in JogosController:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { ListarNotificacoesController };
