import { Request, Response } from "express";
import { CreatePedidoService, CreatePedidoInput } from "../../services/pedidos/CreatePedidoService";

class CreatePedidoController {
  private service: CreatePedidoService;

  constructor(service: CreatePedidoService) {
    this.service = service;
  }

  async handle(req: Request, res: Response) {
    try {
      console.log("codControle RECEBIDO:", req.body?.codControle);
      const payload: CreatePedidoInput = req.body;

      const result = await this.service.execute(payload);

      if (typeof result === "string") {
        return res.status(400).json({ error: result });
      }

      return res.json({ success: true, message: result });
    } catch (error) {
      console.error("Error in CreatePedidoController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { CreatePedidoController };
