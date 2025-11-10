import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionesService } from './evaluaciones.service';
import { EvaluacionesController } from './evaluaciones.controller';
import { Evaluacion } from './evaluacion.entity';
import { FactorDetectado } from './factor-detectado.entity';
import { RespuestaEstudiante } from '../respuesta-estudiante/respuesta-estudiante.entity';
import { Matriz } from '../matrices/matriz.entity';
import { Estudiante } from '../usuarios/estudiante.entity';
import { Respuesta } from '../respuestas/respuesta.entity'; 
import { Recomendacion } from '../recomendaciones/recomendacion.entity';
import { Pregunta } from 'src/preguntas/pregunta.entity';
import { CategoriaPreguntas } from 'src/preguntas/categoria-preguntas.entity';
import { DecisionTreeService } from './arbol.service';
import { PlnService } from './pln.service';
import { HttpModule } from '@nestjs/axios';
import { AlertasModule } from '../alertas/alertas.module';
@Module({
  imports: [
    HttpModule,
    AlertasModule,
    TypeOrmModule.forFeature([
      Evaluacion,
      FactorDetectado,
      RespuestaEstudiante,
      Matriz,
      Estudiante,
      Respuesta,
      Recomendacion,
      Pregunta,              
      CategoriaPreguntas,    
    ]),
  ],
  controllers: [EvaluacionesController],
  providers: [EvaluacionesService, DecisionTreeService, PlnService],
  exports: [EvaluacionesService],
})
export class EvaluacionesModule {}
