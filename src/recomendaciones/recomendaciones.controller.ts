import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RecomendacionesService } from './recomendaciones.service';

@Controller('recomendaciones')
export class RecomendacionesController {
  constructor(private readonly recomendacionesService: RecomendacionesService) {}

  @Post()
  crear(
    @Body('id_matriz') id_matriz: string,
    @Body('categoria') categoria: string,
    @Body('nivel_riesgo') nivel_riesgo: string,
    @Body('mensaje') mensaje: string,
  ) {
    return this.recomendacionesService.crear(id_matriz, categoria, nivel_riesgo, mensaje);
  }

  @Get()
  obtenerTodas() {
    return this.recomendacionesService.obtenerTodas();
  }

  @Get('matriz/:id')
  listarPorMatriz(@Param('id') id: string) {
    return this.recomendacionesService.listarPorMatriz(id);
  }
}
