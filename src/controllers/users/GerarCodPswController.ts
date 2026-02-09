import { Request, Response } from 'express';
import { GerarCodPswService } from '../../services/users/GerarCodPswService';

class GerarCodPswController {
    private gerarCodPswService: GerarCodPswService;

    constructor(gerarCodPswService: GerarCodPswService) {
        this.gerarCodPswService = gerarCodPswService;
    }

    async handle(req: Request, res: Response) {
        const { email } = req.body;

        try {
            const result = await this.gerarCodPswService.execute(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { GerarCodPswController };
