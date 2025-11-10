import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Rol } from '../roles/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // 🔒 Solo roles con token y permisos pueden listar
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  // ✅ Crear usuario con rol por nombre ("estudiante", "psicologo", etc.)
@Post()
async create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
  if (!dto.rol) {
    throw new NotFoundException(
      'El campo "rol" es obligatorio. Ejemplo: { "rol": "estudiante" }',
    );
  }

  dto.rol = dto.rol.toLowerCase();

  // ✅ No hasheamos aquí. Lo hace el service.
  return await this.usuariosService.create(dto);
}



  // 🔄 Actualizar usuario
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('nombre') nombre?: string,
    @Body('correo') correo?: string,
    @Body('estado_cuenta') estado_cuenta?: string,
  ): Promise<Usuario> {
    return this.usuariosService.update(id, nombre, correo, estado_cuenta);
  }

  // ❌ Eliminar usuario
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.usuariosService.remove(id).then(() => ({
      message: `Usuario ${id} eliminado`,
    }));
  }
}
