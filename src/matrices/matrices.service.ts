import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matriz } from './matriz.entity';

@Injectable()
export class MatricesService {
  constructor(
    @InjectRepository(Matriz)
    private readonly matrizRepo: Repository<Matriz>,
  ) {}

  async crear(nombre: string, configuracion: any, version: number) {
    const nueva = this.matrizRepo.create({
      nombre,
      configuracion,
      version,
    });
    return this.matrizRepo.save(nueva);
  }

  async obtenerTodas() {
    return this.matrizRepo.find({ relations: ['recomendaciones'] });
  }

  async obtenerPorId(id: string) {
    const matriz = await this.matrizRepo.findOne({
      where: { id_matriz: id },
      relations: ['recomendaciones'],
    });

    if (!matriz) throw new NotFoundException('Matriz no encontrada');
    return matriz;
  }
  async obtenerUltima() {
  const matrices = await this.matrizRepo.find({
    order: { version: 'DESC' },
    take: 1,
    relations: ['recomendaciones'],
  });

  if (!matrices.length)
    throw new NotFoundException('No existen matrices registradas');

  return matrices[0];
}


}
