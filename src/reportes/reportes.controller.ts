import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { FiltroReporteDto } from './dto/filtro-reporte.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}
  @Get('filtros')
    @Roles('psicologo')
    async obtenerFiltros() {
    return this.reportesService.obtenerOpcionesFiltros();
}


  @Get('general')
  @Roles('psicologo', 'psicopedagogo')
  obtenerResumen(@Query() filtro: FiltroReporteDto) {
    return this.reportesService.obtenerResumenGeneral(filtro);
  }

  @Get('factores')
  @Roles('psicologo')
  obtenerFactores(@Query() filtro: FiltroReporteDto) {
  return this.reportesService.factoresFrecuentes(filtro);
}

  @Get('evolucion')
  @Roles('psicologo')
  obtenerEvolucion(@Query() filtro: FiltroReporteDto) {
  return this.reportesService.evolucionRiesgo(filtro);
}
}
