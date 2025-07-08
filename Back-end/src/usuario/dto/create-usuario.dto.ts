import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength } from "class-validator"

export class CreateUsuarioDto {

    @IsString()
    @MaxLength(20, {message: "O nome precisa ter no máximo 20 caracteres!"})
    @IsNotEmpty({message: "O nome não pode ser vazio!"})
    readonly nome: string

    @IsNumber()
    @IsNotEmpty({message: "A idade não pode ser vazia!"})
    readonly idade: number

    @IsString()
    @MaxLength(40, {message: "O endereço precisa ter no máximo 40 caracteres!"})
    @IsNotEmpty({message: "O endereço não pode ser vazio!"})
    readonly endereco: string

    @IsPhoneNumber()
    @IsNotEmpty({message: "O telefone não pode ser vazio!"})
    readonly telefone: string 
}
