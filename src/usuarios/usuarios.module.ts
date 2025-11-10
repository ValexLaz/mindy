import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Rol } from '../roles/rol.entity';
import { Estudiante } from './estudiante.entity';
import { Psicologo } from './psicologo.entity';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Estudiante, Psicologo])],
  providers: [UsuariosService, EstudiantesService],
  controllers: [UsuariosController, EstudiantesController],
  exports: [UsuariosService, EstudiantesService],
})
export class UsuariosModule {}
