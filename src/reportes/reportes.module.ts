import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { Evaluacion } from 'src/evaluaciones/evaluacion.entity';
import { FactorDetectado } from 'src/evaluaciones/factor-detectado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, FactorDetectado])],
  providers: [ReportesService],
  controllers: [ReportesController],
})
export class ReportesModule {}
