import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from '../roles/rol.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  @Column({ default: 'activo' })
  estado_cuenta: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'uuid' })
  id_rol: string;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;
}
