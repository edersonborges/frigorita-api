import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @IsString()
    nome: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    senha: string;

    @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
    @IsString()
    dataNasc: string;

    @IsString()
    telefone: string;

    constructor(init?: Partial<CreateUserDTO>) {
        this.nome = init?.nome ?? '';
        this.senha = init?.senha ?? '';
        this.dataNasc = init?.dataNasc ?? '';
        this.telefone = init?.telefone ?? '';
    }
}

export { CreateUserDTO };
