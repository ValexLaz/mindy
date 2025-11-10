import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Usuario } from './usuario.entity';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(id_usuario: string, carrera: string, semestre: number, edad: number, sexo: string, pseudonimo?: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const estudiante = this.estudianteRepo.create({
      usuario: { id_usuario } as Usuario,
      carrera,
      semestre,
      edad,
      sexo,
      pseudonimo,
    });

    return this.estudianteRepo.save(estudiante);
  }

  async obtenerTodos() {
    return this.estudianteRepo.find({ relations: ['usuario'] });
  }

  async obtenerPorId(id: string) {
    const estudiante = await this.estudianteRepo.findOne({
      where: { id_estudiante: id },
      relations: ['usuario'],
    });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }
  findByUsuario(id_usuario: string) {
    return this.estudianteRepo.findOne({
      where: { usuario: { id_usuario } },
      relations: ['usuario'],
    });
  }
}
