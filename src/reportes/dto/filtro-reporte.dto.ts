import { IsOptional, IsString, IsDateString } from 'class-validator';

export class FiltroReporteDto {
  @IsOptional()
  @IsString()
  carrera?: string;

  @IsOptional()
  @IsString()
  semestre?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;
}
