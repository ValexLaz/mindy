import { IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateRespuestaEstudianteDto {
  @IsUUID()
  id_evaluacion: string;

  @IsUUID()
  id_pregunta: string;

  @IsUUID()
  id_respuesta: string;

  @IsOptional()
  respuesta_texto?: string;
}
