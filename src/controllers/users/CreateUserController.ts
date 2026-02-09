import { Request, Response } from 'express';
import { CreateUserService } from '../../services/users/CreateUserService';
import { serializeBigInt } from '../../utils/serializeBigInt';

interface CreateUserInput {
    nome: string;
    senha: string;
    dataNasc: string;
    email: string; 
    telefone: string;
}

class CreateUserController {
    private userService: CreateUserService;

    constructor(userService: CreateUserService) {
        this.userService = userService;
    }

    async handle(req: Request, res: Response) {
        try {
            const createUserInput: CreateUserInput = req.body;
            const result = await this.userService.execute(createUserInput);

            if (typeof result === 'string') {
                return res.status(400).json({ error: result });
            }

            const message = serializeBigInt(result);
            return res.json({ success: true, message });
        } catch (error) {
            console.error('Error in CreateUserController:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { CreateUserController };
