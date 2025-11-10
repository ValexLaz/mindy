import { IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateRespuestaDto {
  @IsUUID()
  @IsNotEmpty()
  id_pregunta: string;

  @IsNotEmpty()
  texto: string;

  @IsOptional()
  @IsNumber()
  peso?: number;
}
