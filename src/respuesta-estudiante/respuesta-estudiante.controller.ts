import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RespuestaEstudianteService } from './respuesta-estudiante.service';
import { CreateRespuestaEstudianteDto } from './dto/create-respuesta-estudiante.dto';

@Controller('respuesta-estudiante')
export class RespuestaEstudianteController {
  constructor(private readonly service: RespuestaEstudianteService) {}

  @Post()
  create(@Body() dto: CreateRespuestaEstudianteDto) {
    return this.service.create(dto);
  }

  @Get('evaluacion/:id_evaluacion')
  findByEvaluacion(@Param('id_evaluacion') id: string) {
    return this.service.findByEvaluacion(id);
  }
}
