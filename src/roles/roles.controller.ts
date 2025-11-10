import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from './rol.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getRoles(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async getRol(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(id);
  }

  @Post()
  async createRol(
    @Body('nombre') nombre: string,
    @Body('descripcion') descripcion?: string,
  ): Promise<Rol> {
    return this.rolesService.create(nombre, descripcion);
  }

  @Put(':id')
  async updateRol(
    @Param('id') id: string,
    @Body('nombre') nombre?: string,
    @Body('descripcion') descripcion?: string,
  ): Promise<Rol> {
    return this.rolesService.update(id, nombre, descripcion);
  }

  @Delete(':id')
  async deleteRol(@Param('id') id: string): Promise<{ message: string }> {
    await this.rolesService.remove(id);
    return { message: `Rol con id ${id} eliminado correctamente` };
  }
}
