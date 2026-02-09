import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/users/UpdateUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class UpdateUserController {
    private updateUserService: UpdateUserService;

    constructor(updateUserService: UpdateUserService) {
        this.updateUserService = updateUserService;
    }

    async handle(req: Request, res: Response) {
        try {
            const result = await this.updateUserService.execute(req);

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

export { UpdateUserController };