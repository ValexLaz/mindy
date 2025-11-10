import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Evaluacion } from './evaluacion.entity';

@Entity('factor_detectado')
export class FactorDetectado {
  @PrimaryGeneratedColumn('uuid')
  id_factor: string;

  @ManyToOne(() => Evaluacion)
  @JoinColumn({ name: 'id_evaluacion' })
  evaluacion: Evaluacion;

  @Column({ type: 'varchar', length: 200 })
  descripcion: string;

  @Column({ type: 'decimal', nullable: true })
  peso_asignado: number;
}
