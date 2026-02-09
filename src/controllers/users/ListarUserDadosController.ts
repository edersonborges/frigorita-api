import { Request, Response } from 'express';
import { ListarUserDadosService } from '../../services/users/ListarUserDadosService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarUserDadosController {
    private listarUserDadosService: ListarUserDadosService;

    constructor(listarUserDadosService: ListarUserDadosService) {
        this.listarUserDadosService = listarUserDadosService;
    }

    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        try {
            const result = await this.listarUserDadosService.execute(user_id);

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

export { ListarUserDadosController };
