import { Request, Response } from 'express';
import { ChangePswService } from '../../services/users/ChangePswService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ChangePswController {
    private changePswService: ChangePswService;

    constructor(changePswService: ChangePswService) {
        this.changePswService = changePswService;
    }

    async handle(req: Request, res: Response) {
        try {
            const result = await this.changePswService.execute(req);

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

export { ChangePswController };