import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recomendacion } from './recomendacion.entity';

@Entity('matriz')
export class Matriz {
  @PrimaryGeneratedColumn('uuid')
  id_matriz: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'jsonb' })
  configuracion: any;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @OneToMany(() => Recomendacion, (r) => r.matriz)
  recomendaciones: Recomendacion[];
}
