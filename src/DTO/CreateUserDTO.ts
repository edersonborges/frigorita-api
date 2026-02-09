import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

class CreateUserDTO {
  @IsNotEmpty({ message: "O nome é obrigatório." })
  @IsString({ message: "O nome deve ser uma string." })
  nome: string;

  @IsNotEmpty({ message: "O email é obrigatório." })
  @IsEmail({}, { message: "O email informado é inválido." })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória." })
  @IsString({ message: "A senha deve ser uma string." })
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres." })
  senha: string;

  @IsOptional()
  @IsInt({ message: "A permissão deve ser um número inteiro." })
  @Min(0, { message: "A permissão deve ser maior ou igual a 0." })
  permissao?: number;

  constructor(init?: Partial<CreateUserDTO>) {
    this.nome = init?.nome ?? "";
    this.email = init?.email ?? "";
    this.senha = init?.senha ?? "";
    this.permissao = init?.permissao;
  }
}

export { CreateUserDTO };
