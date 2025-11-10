import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;
}
