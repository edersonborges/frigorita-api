import { Request, Response } from 'express';
import { LogoutService } from '../../services/users/LogoutService';
import { JWT_SECRET } from '../../configs/config';
import { serializeBigInt } from '../../utils/serializeBigInt';

class LogoutController {
    private logoutService: LogoutService;

    constructor(logoutService: LogoutService) {
        this.logoutService = logoutService;
    }

    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const authToken = req.headers.authorization;
            if (!authToken) {
                return res.status(401).end();
            }
            const [, token] = authToken.split(" ");

            if (!JWT_SECRET) {
                console.error('JWT_SECRET is not defined');
                return res.status(500).json({ error: 'Internal server error' });
            }

            const result = await this.logoutService.execute(token);

            if (result === 'Token inválido' || result === 'Falha ao realizar logout') {
                return res.status(400).json({ error: result });
            }

            const message = serializeBigInt(result);
            return res.json({ success: true, message });
        } catch (error) {
            console.error('Error in LogoutController:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { LogoutController };
