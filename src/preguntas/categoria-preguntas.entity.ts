import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Entity('categoria_preguntas')
export class CategoriaPreguntas {
  @PrimaryGeneratedColumn('uuid')
  id_categoria: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.categoria)
  preguntas: Pregunta[];
}
