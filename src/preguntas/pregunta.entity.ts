import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaPreguntas } from './categoria-preguntas.entity';
import { Respuesta } from '../respuestas/respuesta.entity';


@Entity('pregunta')
export class Pregunta {
  @PrimaryGeneratedColumn('uuid')
  id_pregunta: string;

  @ManyToOne(() => CategoriaPreguntas)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaPreguntas;

  @Column('text')
  texto: string;

  @Column({ type: 'boolean', default: false })
  is_open_ended: boolean;

  @OneToMany(() => Respuesta, (r) => r.pregunta)
  respuestas: Respuesta[];
}
