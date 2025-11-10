import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id_estudiante: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 100 })
  carrera: string;

  @Column('int')
  semestre: number;

  @Column('int')
  edad: number;

  @Column({ length: 20 })
  sexo: string;

  @Column({ length: 50, nullable: true })
  pseudonimo: string;
}
