import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  // Crear categoría
  @Post('categoria')
  crearCategoria(
    @Body('nombre') nombre: string,
    @Body('descripcion') descripcion?: string,
  ) {
    return this.preguntasService.crearCategoria(nombre, descripcion);
  }

  // Listar categorías
  @Get('categoria')
  obtenerCategorias() {
    return this.preguntasService.obtenerCategorias();
  }

  // Crear pregunta
  @Post()
  crearPregunta(
    @Body('id_categoria') id_categoria: string,
    @Body('texto') texto: string,
  ) {
    return this.preguntasService.crearPregunta(id_categoria, texto);
  }

  // Listar todas las preguntas con sus respuestas
  @Get()
  obtenerPreguntas() {
    return this.preguntasService.obtenerPreguntas();
  }

  // Crear respuesta asociada a una pregunta
  @Post('respuesta')
  crearRespuesta(
    @Body('id_pregunta') id_pregunta: string,
    @Body('texto') texto: string,
    @Body('peso') peso: number,
  ) {
    return this.preguntasService.crearRespuesta(id_pregunta, texto, peso);
  }

  // Obtener respuestas por pregunta
  @Get('respuesta/:id_pregunta')
  obtenerRespuestasPorPregunta(@Param('id_pregunta') id_pregunta: string) {
    return this.preguntasService.obtenerRespuestasPorPregunta(id_pregunta);
  }
}
