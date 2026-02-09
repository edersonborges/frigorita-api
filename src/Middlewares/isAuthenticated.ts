import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config";
import prismaClient from "../prisma";

interface Payload {
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authToken.split(" ");
  if (!token) {
    return res.status(401).json({ error: "Token malformed" });
  }

  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ error: "Internal server error" });
  }

  try {
    const decoded = verify(token, JWT_SECRET) as Payload;

    req.user_id = decoded.sub;

    const user = await prismaClient.usuario.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        nome: true,
        email: true,
        permissao: true,
        deletedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Soft delete: bloqueia usuário deletado
    if (user.deletedAt) {
      return res.status(401).json({ error: "User deleted" });
    }

    req.user = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      permissao: user.permissao,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
