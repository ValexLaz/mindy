import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntasService } from './preguntas.service';
import { PreguntasController } from './preguntas.controller';
import { CategoriaPreguntas } from './categoria-preguntas.entity';
import { Pregunta } from './pregunta.entity';
import { Respuesta } from '../respuestas/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaPreguntas, Pregunta, Respuesta])],
  providers: [PreguntasService],
  controllers: [PreguntasController],
  exports: [PreguntasService],
})
export class PreguntasModule {}
