import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatricesService } from './matrices.service';
import { MatricesController } from './matrices.controller';
import { Matriz } from './matriz.entity';
import { Recomendacion } from './recomendacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matriz, Recomendacion])],
  providers: [MatricesService],
  controllers: [MatricesController],
  exports: [MatricesService],
})
export class MatricesModule {}
