import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }
  async findOne(id: string): Promise<Rol> {
      const rol = await this.rolRepository.findOne({ where: { id_rol: id } });
      if (!rol) {
        throw new NotFoundException(`Rol con id ${id} no encontrado`);
      }
      return rol;
  }
  async create(nombre: string, descripcion?: string): Promise<Rol> {
    const rol = this.rolRepository.create({ nombre, descripcion });
    return this.rolRepository.save(rol);
  }
  async update(id: string, nombre?: string, descripcion?: string): Promise<Rol> {
    const rol = await this.findOne(id);
    if (nombre) rol.nombre = nombre;
    if (descripcion) rol.descripcion = descripcion;
    return this.rolRepository.save(rol);
  }

  async remove(id: string): Promise<void> {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
  }
}
