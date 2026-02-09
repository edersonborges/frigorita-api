import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

interface CreateUserInput {
  nome: string;
  email: string;
  senha: string;
  permissao?: number; // opcional (default 0 no Prisma)
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

      if (typeof result === "string") {
        return res.status(400).json({ error: result });
      }

      return res.json({ success: true, message: result });
    } catch (error) {
      console.error("Error in CreateUserController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { CreateUserController };
