import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  crear(
    @Body('id_usuario') id_usuario: string,
    @Body('carrera') carrera: string,
    @Body('semestre') semestre: number,
    @Body('edad') edad: number,
    @Body('sexo') sexo: string,
    @Body('pseudonimo') pseudonimo?: string,
  ) {
    return this.estudiantesService.crear(id_usuario, carrera, semestre, edad, sexo, pseudonimo);
  }

  @Get()
  obtenerTodos() {
    return this.estudiantesService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.estudiantesService.obtenerPorId(id);
  }
  @Get('usuario/:id_usuario')
  async findByUsuario(@Param('id_usuario') id_usuario: string) {
    const estudiante = await this.estudiantesService.findByUsuario(id_usuario);
    if (!estudiante) {
      throw new NotFoundException(
        `No se encontró estudiante asociado al usuario ${id_usuario}`,
      );
    }
    return estudiante;
  }
}
