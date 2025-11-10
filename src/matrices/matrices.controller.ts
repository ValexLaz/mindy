import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MatricesService } from './matrices.service';

@Controller('matrices')
export class MatricesController {
  constructor(private readonly matricesService: MatricesService) {}

  @Post()
  crear(
    @Body('nombre') nombre: string,
    @Body('configuracion') configuracion: any,
    @Body('version') version: number,
  ) {
    return this.matricesService.crear(nombre, configuracion, version);
  }

  @Get()
  obtenerTodas() {
    return this.matricesService.obtenerTodas();
  }
  
  @Get('ultima')
  async obtenerUltimaMatriz() {
    return this.matricesService.obtenerUltima();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.matricesService.obtenerPorId(id);
  }
  
}
