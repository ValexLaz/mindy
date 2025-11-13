import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { Seguimiento } from './seguimiento.entity';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  // 🔹 Crear un seguimiento
  @Post()
  async crear(@Body() data: Partial<Seguimiento>) {
    return this.seguimientoService.crearSeguimiento(data);
  }

  // 🔹 Obtener seguimiento por alerta
  @Get('alerta/:id_alerta')
  async obtenerPorAlerta(@Param('id_alerta') id_alerta: string) {
    return this.seguimientoService.obtenerPorAlerta(id_alerta);
  }

  // 🔹 Actualizar notas del psicólogo
  @Patch(':id_seguimiento/notas')
  async actualizarNotas(
    @Param('id_seguimiento') id_seguimiento: string,
    @Body('notas') notas: string,
  ) {
    return this.seguimientoService.actualizarNotas(id_seguimiento, notas);
  }

  // 🔹 Cerrar caso
  @Patch(':id_seguimiento/cerrar')
  async cerrar(@Param('id_seguimiento') id_seguimiento: string) {
    return this.seguimientoService.cerrarSeguimiento(id_seguimiento);
  }
}
