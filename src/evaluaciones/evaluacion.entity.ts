import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Estudiante } from '../usuarios/estudiante.entity';
import { Matriz } from '../matrices/matriz.entity';
import { RespuestaEstudiante } from '../respuesta-estudiante/respuesta-estudiante.entity';
import { FactorDetectado } from './factor-detectado.entity';


@Entity('evaluacion')
export class Evaluacion {
  @PrimaryGeneratedColumn('uuid')
  id_evaluacion: string;

  @ManyToOne(() => Estudiante)
  @JoinColumn({ name: 'id_estudiante' })
  estudiante: Estudiante;

  @ManyToOne(() => Matriz)
  @JoinColumn({ name: 'id_matriz' })
  matriz: Matriz;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'decimal', nullable: true })
  puntaje_total: number;

  @Column({ type: 'decimal', nullable: true })
  puntaje_pln: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nivel_riesgo: string;

  @OneToMany(() => RespuestaEstudiante, (r) => r.evaluacion)
  respuestas: RespuestaEstudiante[];

  @OneToMany(() => FactorDetectado, (f) => f.evaluacion)
  factores: FactorDetectado[];
}
