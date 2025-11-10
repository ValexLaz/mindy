import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from '../roles/rol.entity';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // 🔹 Listar todos los usuarios
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find({ relations: ['rol'] });
  }

  // 🔹 Buscar usuario por ID
  async findOne(id: string): Promise<Usuario> {
    const user = await this.usuarioRepo.findOne({
      where: { id_usuario: id },
      relations: ['rol'],
    });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return user;
  }

  // 🔹 Buscar usuario por correo
  async findByEmail(correo: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { correo },
      relations: ['rol'],
    });
  }

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const { nombre, correo, contraseña, rol: nombreRol } = dto;
    const rol = await this.rolRepo.findOne({
      where: { nombre: nombreRol.toLowerCase() },
    });
    if (!rol) {
      throw new NotFoundException(
        `No se encontró un rol con el nombre "${nombreRol}"`,
      );
    }
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevo = this.usuarioRepo.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      id_rol: rol.id_rol,
      rol,
    });
    return await this.usuarioRepo.save(nuevo);
  }

  // 🔹 Actualizar usuario
  async update(
    id: string,
    nombre?: string,
    correo?: string,
    estado_cuenta?: string,
  ): Promise<Usuario> {
    const user = await this.findOne(id);
    if (nombre) user.nombre = nombre;
    if (correo) user.correo = correo;
    if (estado_cuenta) user.estado_cuenta = estado_cuenta;
    return this.usuarioRepo.save(user);
  }

  // 🔹 Eliminar usuario
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usuarioRepo.remove(user);
  }
}
