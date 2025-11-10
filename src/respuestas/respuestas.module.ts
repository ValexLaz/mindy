import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaService } from './respuestas.service';
import { RespuestaController } from './respuestas.controller';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from '../preguntas/pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta, Pregunta])],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestasModule {}
