import {IsDateString, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateAdocaoDto {
  @IsInt()
  animalId: number;

  @IsString()
  @IsNotEmpty({ message: 'O nome do adotante é obrigatório.' })
  adotante: string;

  @IsDateString()
  @IsOptional()
  dataAdocao?: string; // Pode receber data como string ISO, opcional (vai default no banco)

  @IsOptional()
  @IsString()
  observacoes?: string;
}
