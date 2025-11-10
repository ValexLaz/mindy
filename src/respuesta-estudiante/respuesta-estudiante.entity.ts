import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Evaluacion } from '../evaluaciones/evaluacion.entity';
import { Pregunta } from '../preguntas/pregunta.entity';
import { Respuesta } from '../respuestas/respuesta.entity';

@Entity('respuesta_estudiante')
export class RespuestaEstudiante {
  @PrimaryGeneratedColumn('uuid')
  id_respuesta_est: string;

  @ManyToOne(() => Evaluacion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_evaluacion' })
  evaluacion: Evaluacion;

  @ManyToOne(() => Pregunta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @ManyToOne(() => Respuesta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_respuesta' })
  respuesta: Respuesta;

  @Column({ type: 'text', nullable: true })
  respuesta_texto: string | null;

}
