import { MESSAGES } from "@nestjs/core/constants";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAnimalDto {

    @IsString()
    @MaxLength(20, {message: "O nome precisa ter no máximo 20 caracteres!"})
    readonly nome: string
    
    @IsString()
    @IsNotEmpty({message: "O sexo do animal não pode ser vázio!" })
    readonly sexo: string

    @MaxLength(20, {message: "O nome precisa ter no máximo 20 caracteres!"})
    @IsNotEmpty({message: "A raça não pode ser vazia"})
    readonly raca: string
    
    @IsString()
    @IsNotEmpty({message: "O porte do animal não pode ser vázio!" })
    readonly porte: string
    
    readonly adotado: boolean


}

