import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerta } from './alerta.entity';
import { AlertasService } from './alertas.service';
import { AlertasController } from './alertas.controller';
import { Evaluacion } from '../evaluaciones/evaluacion.entity'; 
import { Estudiante } from '../usuarios/estudiante.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Alerta, Evaluacion, Estudiante])], 
  providers: [AlertasService],
  controllers: [AlertasController],
  exports: [AlertasService], 
})
export class AlertasModule {}