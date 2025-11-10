import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recomendacion } from './recomendacion.entity';
import { Matriz } from '../matrices/matriz.entity';

@Injectable()
export class RecomendacionesService {
  constructor(
    @InjectRepository(Recomendacion)
    private readonly recomendacionRepo: Repository<Recomendacion>,
    @InjectRepository(Matriz)
    private readonly matrizRepo: Repository<Matriz>,
  ) {}

  async crear(id_matriz: string, categoria: string, nivel_riesgo: string, mensaje: string) {
    const matriz = await this.matrizRepo.findOne({ where: { id_matriz } });
    if (!matriz) throw new NotFoundException('Matriz no encontrada');

    const nueva = this.recomendacionRepo.create({
      matriz: { id_matriz } as Matriz,
      categoria,
      nivel_riesgo,
      mensaje,
    });
    return this.recomendacionRepo.save(nueva);
  }

  async listarPorMatriz(id_matriz: string) {
    return this.recomendacionRepo.find({
      where: { matriz: { id_matriz } },
    });
  }

  async obtenerTodas() {
    return this.recomendacionRepo.find({ relations: ['matriz'] });
  }
}
