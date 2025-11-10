import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Matriz } from '../matrices/matriz.entity';

@Entity('recomendacion')
export class Recomendacion {
  @PrimaryGeneratedColumn('uuid')
  id_recomendacion: string;

  @ManyToOne(() => Matriz, (matriz) => matriz.recomendaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_matriz' })
  matriz: Matriz;

  @Column({ length: 100 })
  categoria: string;

  @Column({ length: 50 })
  nivel_riesgo: string;

  @Column('text')
  mensaje: string;
}
