import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from '../configs/config';
import { redisClient } from '../utils/redis';
import prismaClient from '../prisma';

interface Payload {
  sub: string;
  nome: string;
  telefone: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    // Verifica se o token está na blacklist
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ error: 'Token invalidated' }).end();
    }

    const decoded = verify(token, JWT_SECRET) as Payload;
    req.user_id = decoded.sub;
    
    // Buscar informações adicionais do usuário no banco de dados
    const user = await prismaClient.usuario.findUnique({
      where: { id: decoded.sub }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' }).end();
    }

    req.user = {
      id: user.id,
      nome: user.nome,
      telefone: user.telefone,
    };

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
