import { Controller, Get, UseGuards, Request, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { AlertasService } from './alertas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AlertStatus } from './alerta.entity'; 
@Controller('alertas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  @Get('/dashboard') 
  @Roles('psicologo', 'administrador')
  async findAlertsForDashboard(@Request() req) {
    return this.alertasService.findRecentAlertsForDashboard();
  }

  @Patch(':id/vista')
  @Roles('psicologo', 'administrador')
  async markAsViewed(@Param('id', ParseUUIDPipe) id: string) {
    return this.alertasService.updateStatus(id, AlertStatus.VISTA);
  }
}