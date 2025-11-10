import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { CrearEvaluacionDto } from './dto/crear-evaluacion.dto';
import { RegistrarRespuestaDto } from './dto/registrar-respuesta.dto';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  // 1️⃣ Iniciar una nueva evaluación
  @Post('iniciar')
  async iniciar(@Body() data: CrearEvaluacionDto) {
    return this.evaluacionesService.iniciarEvaluacion(data);
  }

  // 2️⃣ Registrar la respuesta del estudiante
  @Post('responder')
  async responder(@Body() data: RegistrarRespuestaDto) {
    return this.evaluacionesService.registrarRespuesta(data);
  }

  // 3️⃣ Obtener la siguiente pregunta (flujo adaptativo)
  // 🔄 Cambio de @Get → @Post para aceptar body desde Flutter
  @Post('siguiente/:id')
  async siguiente(
    @Param('id') id: string,
    @Body() body: { id_estudiante?: string; id_matriz?: string },
  ) {
    const { id_estudiante, id_matriz } = body;
    // Si en el futuro usas esos datos, ya estarán disponibles aquí
    return this.evaluacionesService.obtenerSiguientePreguntaAdaptativa(id);
  }

  // 4️⃣ Calcular el resultado de la evaluación
  @Get('resultado/:id')
  async resultado(@Param('id') id: string) {
    return this.evaluacionesService.calcularResultado(id);
  }

  // 5️⃣ Obtener todas las evaluaciones de un estudiante
  @Get('estudiante/:id')
  async obtenerPorEstudiante(@Param('id') id: string) {
    return this.evaluacionesService.obtenerEvaluacionesPorEstudiante(id);
  }

  // 6️⃣ Obtener detalle completo de una evaluación
  @Get(':id')
  async detalle(@Param('id') id: string) {
    return this.evaluacionesService.obtenerDetalle(id);
  }
}
