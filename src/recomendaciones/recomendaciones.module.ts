import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recomendacion } from './recomendacion.entity';
import { RecomendacionesService } from './recomendaciones.service';
import { RecomendacionesController } from './recomendaciones.controller';
import { Matriz } from '../matrices/matriz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recomendacion, Matriz])],
  providers: [RecomendacionesService],
  controllers: [RecomendacionesController],
  exports: [RecomendacionesService],
})
export class RecomendacionesModule {}
