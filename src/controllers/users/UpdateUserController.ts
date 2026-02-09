import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";

class UpdateUserController {
  private updateUserService: UpdateUserService;

  constructor(updateUserService: UpdateUserService) {
    this.updateUserService = updateUserService;
  }

  async handle(req: Request, res: Response) {
    try {
      const result = await this.updateUserService.execute(req);

      if (typeof result === "string") {
        return res.status(400).json({ error: result });
      }

      return res.json({ success: true, message: result });
    } catch (error) {
      console.error("Error in UpdateUserController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { UpdateUserController };
