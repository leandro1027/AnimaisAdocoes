import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min,} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A espécie é obrigatória.' })
  especie: string;

  @IsOptional()
  @IsString()
  raca?: string;

  @IsOptional()
  @IsInt({ message: 'A idade deve ser um número inteiro.' })
  @Min(0, { message: 'A idade deve ser maior ou igual a 0.' })
  idade?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsBoolean()
  adotado?: boolean;

  @IsInt()
  usuarioId: number;
}
