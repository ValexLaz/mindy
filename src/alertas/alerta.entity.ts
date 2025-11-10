import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Evaluacion } from '../evaluaciones/evaluacion.entity';

export enum AlertStatus {
  NUEVA = 'nueva',
  VISTA = 'vista',
  EN_SEGUIMIENTO = 'en_seguimiento',
  RESUELTA = 'resuelta',
  DESCARTADA = 'descartada', 
}

@Entity('alerta')
export class Alerta {
  @PrimaryGeneratedColumn('uuid')
  id_alerta: string;

  @ManyToOne(() => Evaluacion)
  @JoinColumn({ name: 'id_evaluacion' })
  evaluacion: Evaluacion; 

  @Column('uuid') 
  id_estudiante: string;

  @Column({ type: 'varchar', length: 50, nullable: true }) 
  nivel_riesgo: string; 

  @Column({ type: 'varchar', length: 20, default: AlertStatus.NUEVA }) 
  estado: string; 

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' }) 
  fecha: Date;

}