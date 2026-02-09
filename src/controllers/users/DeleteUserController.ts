import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/DeleteUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class DeleteUserController {
    private deleteUserService: DeleteUserService;

    constructor(deleteUserService: DeleteUserService) {
        this.deleteUserService = deleteUserService;
    }

    async handle(req: Request, res: Response) {
        const userId = req.user_id
        try {
            const result = await this.deleteUserService.execute(userId);

            if (typeof result === 'string') {
                return res.status(400).json({ error: result });
            }

            const message = serializeBigInt(result);
            return res.json({ success: true, message });
        } catch (error) {
            console.error('Error in DeleteUserController:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { DeleteUserController };
