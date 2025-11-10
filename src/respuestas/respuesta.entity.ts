import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pregunta } from '../preguntas/pregunta.entity';

@Entity('respuesta')
export class Respuesta {
  @PrimaryGeneratedColumn('uuid')
  id_respuesta: string;

  @ManyToOne(() => Pregunta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pregunta' })
  pregunta: Pregunta;

  @Column({ type: 'text' })
  texto: string;

  @Column({ type: 'decimal', nullable: true })
  peso: number;
}
