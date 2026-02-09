declare namespace Express {
  export interface User {
    id: string;
    nome: string;
    telefone: string;
  }

  export interface Request {
    user_id: string;
    user?: User;
  }
}
