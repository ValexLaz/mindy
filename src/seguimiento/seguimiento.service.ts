import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguimiento } from './seguimiento.entity';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly seguimientoRepo: Repository<Seguimiento>,
  ) {}

  async crearSeguimiento(data: Partial<Seguimiento>) {
    const nuevo = this.seguimientoRepo.create({
      ...data,
      fecha_inicio: data.fecha_inicio ?? new Date(),
      estado: data.estado ?? 'activo',
    });
    return await this.seguimientoRepo.save(nuevo);
  }

  async obtenerPorAlerta(id_alerta: string) {
    const seguimiento = await this.seguimientoRepo.findOne({
      where: { id_alerta },
      relations: ['alerta', 'psicologo'],
    });
    if (!seguimiento) {
      throw new NotFoundException(`No se encontró seguimiento para la alerta ${id_alerta}`);
    }
    return seguimiento;
  }

  async actualizarNotas(id_seguimiento: string, notas: string) {
    const seguimiento = await this.seguimientoRepo.findOneBy({ id_seguimiento });
    if (!seguimiento) throw new NotFoundException('Seguimiento no encontrado');

    seguimiento.notas = notas;
    return await this.seguimientoRepo.save(seguimiento);
  }

  async cerrarSeguimiento(id_seguimiento: string) {
    const seguimiento = await this.seguimientoRepo.findOneBy({ id_seguimiento });
    if (!seguimiento) throw new NotFoundException('Seguimiento no encontrado');

    seguimiento.estado = 'cerrado';
    seguimiento.fecha_fin = new Date();
    return await this.seguimientoRepo.save(seguimiento);
  }
}
