declare namespace Express {
  export interface User {
    id: string;
    nome: string;
    email: string;
    permissao: number;
  }

  export interface Request {
    user_id: string;
    user?: User;
  }
}
