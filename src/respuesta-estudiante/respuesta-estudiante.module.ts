import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaEstudianteService } from './respuesta-estudiante.service';
import { RespuestaEstudianteController } from './respuesta-estudiante.controller';
import { RespuestaEstudiante } from './respuesta-estudiante.entity';
import { Evaluacion } from '../evaluaciones/evaluacion.entity';
import { Pregunta } from '../preguntas/pregunta.entity';
import { Respuesta } from '../respuestas/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RespuestaEstudiante, Evaluacion, Pregunta, Respuesta])],
  controllers: [RespuestaEstudianteController],
  providers: [RespuestaEstudianteService],
})
export class RespuestaEstudianteModule {}
