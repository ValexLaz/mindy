import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RespuestaService } from './respuestas.service';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Controller('respuesta')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestaService) {}

  @Post()
  create(@Body() dto: CreateRespuestaDto) {
    return this.respuestaService.create(dto);
  }

  @Get()
  findAll() {
    return this.respuestaService.findAll();
  }

  @Get('pregunta/:id_pregunta')
  findByPregunta(@Param('id_pregunta') id: string) {
    return this.respuestaService.findByPregunta(id);
  }
}
