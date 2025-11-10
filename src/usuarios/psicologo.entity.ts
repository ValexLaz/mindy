import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('psicologo')
export class Psicologo {
  @PrimaryGeneratedColumn('uuid')
  id_psicologo: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 100 })
  especialidad: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
