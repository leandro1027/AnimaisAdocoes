import { IsEAN, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, MaxLength } from "class-validator"

export class CreateUsuarioDto {
    
    @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsOptional()
  @IsString()
  @Length(10, 20, { message: 'O telefone deve ter entre 10 e 20 caracteres.' })
  telefone?: string;

  @IsOptional()
  @IsString()
  endereco?: string;
}
