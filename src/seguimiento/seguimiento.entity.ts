import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Alerta } from 'src/alertas/alerta.entity';
import { Psicologo } from 'src/usuarios/psicologo.entity';

@Entity({ name: 'seguimiento' })
export class Seguimiento {
  @PrimaryGeneratedColumn('uuid')
  id_seguimiento: string;

  @Column({ type: 'uuid' })
  id_alerta: string;

  @Column({ type: 'uuid' })
  id_psicologo: string;

  @Column({ type: 'text', nullable: true })
  plan_intervencion: string;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @Column({ type: 'varchar', length: 20, default: 'activo' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  // 🔹 Relaciones
  @ManyToOne(() => Alerta, alerta => alerta.id_alerta)
  @JoinColumn({ name: 'id_alerta' })
  alerta: Alerta;

  @ManyToOne(() => Psicologo, psicologo => psicologo.id_psicologo)
  @JoinColumn({ name: 'id_psicologo' })
  psicologo: Psicologo;
}
